import { AzureKeyCredential, OpenAIClient } from "@azure/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { OPENAI_AZURE_KEY, OPENAI_AZURE_URL } from "$env/static/private";
import type { RequestHandler } from "./$types";

export const config = {
  runtime: "edge",
};

const client = new OpenAIClient(
  OPENAI_AZURE_URL,
  new AzureKeyCredential(OPENAI_AZURE_KEY),
);

export const POST: RequestHandler = async ({ request }) => {
  const { messages } = await request.json();

  const response = await client.streamChatCompletions("GPT-4-turbo", messages);
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
};
