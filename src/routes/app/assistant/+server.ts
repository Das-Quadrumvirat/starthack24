import {
  AzureKeyCredential,
  type FunctionDefinition,
  OpenAIClient,
} from "@azure/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { OPENAI_AZURE_KEY, OPENAI_AZURE_URL } from "$env/static/private";
import type { RequestHandler } from "./$types";
import type { Message as VercelChatMessage } from "ai";
import { z } from "zod";

export const config = {
  runtime: "edge",
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

const client = new OpenAIClient(
  OPENAI_AZURE_URL,
  new AzureKeyCredential(OPENAI_AZURE_KEY),
);

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

const functions: FunctionDefinition[] = [
  {
    name: "stock_pick",
    description: "Show the user a stock pick",
    parameters: {
      type: "object",
      properties: {
        isin: { type: "string", description: "The ISIN of the stock" },
        comment: {
          type: "string",
          description: "A comment for your stock pick",
        },
      },
      required: ["isin", "comment"],
    },
  },
];

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const messages = body.messages as VercelChatMessage[];

  const response = await client.streamChatCompletions(
    "gpt-4-turbo",
    messages,
    {
      functions,
      functionCall: "auto",
    },
  );
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
};
