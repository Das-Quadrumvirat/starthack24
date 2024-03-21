import {
  AzureKeyCredential,
  type FunctionDefinition,
  OpenAIClient,
} from "@azure/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { OPENAI_AZURE_KEY, OPENAI_AZURE_URL } from "$env/static/private";
import type { RequestHandler } from "./$types";
import type { Message as VercelChatMessage } from "ai";
import esg from "$lib/data/data.json";
import { findBestFund } from "$lib/ai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { UserDescription } from "$lib/types";

export const config = {
  runtime: "edge",
};

const client = new OpenAIClient(
  OPENAI_AZURE_URL,
  new AzureKeyCredential(OPENAI_AZURE_KEY),
);

const functions: FunctionDefinition[] = [
  {
    name: "user_description",
    description: "Take notes on the user and their preferences.",
    parameters: zodToJsonSchema(UserDescription),
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
