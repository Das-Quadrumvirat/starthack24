import { AzureKeyCredential, OpenAIClient } from "@azure/openai";
import { StreamingTextResponse } from "ai";
import { OPENAI_AZURE_KEY, OPENAI_AZURE_URL } from "$env/static/private";
import type { RequestHandler } from "./$types";
import { AzureChatOpenAI } from "@langchain/azure-openai";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  BytesOutputParser,
  JsonOutputParser,
} from "@langchain/core/output_parsers";
import type { Message as VercelChatMessage } from "ai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";

export const config = {
  runtime: "edge",
};

const formatMessage = (message: VercelChatMessage): string => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE =
  `You are a personal investment consultand named Lina. You're purpose is to help unexperienced people make sensible investment decisions. The users you are interacting with are primarily young adults earning their first money and wanting to invest it. Recommend primarily funds. Use easy language and avoid the pig latin.

Current conversation:
{chat_history}

User: {input}
AI:`;

const stockPick = z.object({
  isin: z.string().describe("The ISIN of the stock"),
  comment: z.string().describe("A comment for your stock pick"),
});

const zodSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("text").describe(
      "You want to output text to the user, no rich data",
    ),
    content: z.string().describe(
      "the text you want to output to the user as markdown",
    ),
  }),
  z.object({
    kind: z.literal("stockPick").describe("You want to output a stock pick"),
    data: stockPick,
  }),
]);

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const messages = body.messages as VercelChatMessage[];

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
  const credentials = new AzureKeyCredential(OPENAI_AZURE_KEY);

  const model = new AzureChatOpenAI({
    credentials,
    azureOpenAIEndpoint: OPENAI_AZURE_URL,
    azureOpenAIApiDeploymentName: "gpt-4-turbo",
    // modelName: "gpt-35-turbo",
    verbose: true,
  });

  const functionCallingModel = model.bind({
    functions: [
      {
        name: "stock_pick",
        description:
          "Use this to show the user a stock pick. It will give a rich preview in the UI.",
        parameters: zodToJsonSchema(z.array(stockPick)),
      },
    ],
  });

  const tmp = await prompt.pipe(functionCallingModel).pipe(
    new BytesOutputParser(),
  ).invoke({
    chat_history: formattedPreviousMessages.join("\n"),
    input: currentMessageContent,
  });
  console.log(tmp);

  const outputParser = new BytesOutputParser();

  const chain = prompt.pipe(functionCallingModel).pipe(outputParser);
  const out = await chain.invoke({
    chat_history: formattedPreviousMessages.join("\n"),
    input: currentMessageContent,
  });
  console.log(out);
  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join("\n"),
    input: currentMessageContent,
  });

  return new StreamingTextResponse(stream);
};
