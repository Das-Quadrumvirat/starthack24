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
  {
    name: "esg_data",
    description: "Get ESG data for a fund",
    parameters: {
      type: "object",
      properties: {
        isin: { type: "string", description: "The ISIN of the fund" },
      },
      required: ["isin"],
    },
  },
  {
    name: "match_fund",
    description: "Match a fund based on user preference",
    parameters: {
      type: "object",
      properties: {
        compliance: {
          type: "number",
          description:
            "The compliance score as a float. From 0 to 3 (inclusive). 0 means does not care, 3 means very important",
        },
        sustainability: {
          type: "number",
          description:
            "The sustainability score as a float. From 0 to 1 (inclusive). 0 means does not care, 1 means very important",
        },
        environment: {
          type: "number",
          description:
            "The environment score as a float. From 0 to 1 (inclusive). 0 means does not care, 1 means very important",
        },
        social: {
          type: "number",
          description:
            "The social score as a float. From 0 to 1 (inclusive). 0 means does not care, 1 means very important",
        },
        k: {
          type: "number",
          description:
            "The number of funds to return. Please chose a number between 10 and 20",
        },
      },
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
  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages,
    ) => {
      console.log(name, args);
      if (name === "esg_data") {
        const isin = args.isin;
        const data = esg[isin];
        const newMessages = createFunctionCallMessages(data);
        return client.streamChatCompletions("gpt-4-turbo", [
          ...messages,
          ...newMessages,
        ], {
          functions,
        });
      } else if (name === "match_fund") {
        const { compliance, sustainability, environment, social, k } = args;
        const bestFunds = findBestFund(
          { compliance, sustainability, environment, social },
          k,
        );
        const bestFundsWithData = bestFunds.map(({ isin }) => {
          const data = esg[isin];
          return data;
        });
        const newMessages = createFunctionCallMessages(bestFundsWithData);
        return client.streamChatCompletions("gpt-4-turbo", [
          ...messages,
          ...newMessages,
        ], {
          functions,
        });
      }
    },
  });
  return new StreamingTextResponse(stream);
};
