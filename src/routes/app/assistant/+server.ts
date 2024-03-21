import {
  AzureKeyCredential,
  type FunctionDefinition,
  OpenAIClient,
} from "@azure/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { OPENAI_AZURE_KEY, OPENAI_AZURE_URL } from "$env/static/private";
import type { RequestHandler } from "./$types";
import type { Message as VercelChatMessage } from "ai";

export const config = {
  runtime: "edge",
};

const client = new OpenAIClient(
  OPENAI_AZURE_URL,
  new AzureKeyCredential(OPENAI_AZURE_KEY),
);

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
  {
    name: "stock_price",
    description: "Get the price of a stock right now",
    parameters: {
      type: "object",
      properties: {
        isin: { type: "string", description: "The ISIN of the stock" },
      },
      required: ["isin"],
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
