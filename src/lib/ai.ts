import { type FunctionCallHandler, nanoid } from "ai";
import { PriceData, UserDescription } from "./types";
import esg from "$lib/data/data.json";

export interface StockPick {
  isin: string;
  comment: string;
}

export const clientFunctionCallHandler: FunctionCallHandler = async (
  chatMessages,
  functionCall,
) => {
  console.log(functionCall);
  if (functionCall.name === "asset_pick") {
    const parsedFunctionCallArguments = JSON.parse(functionCall.arguments!);
    const isin = parsedFunctionCallArguments.isin;
    const comment = parsedFunctionCallArguments.comment;
    try {
      const additionalData = await fetch(`/api/asset/${isin}`).then((res) =>
        res.json()
      );
      const priceData = PriceData.parse(additionalData);
      const lastPrices = priceData.data.prices.slice(-30);

      return {
        messages: [
          ...chatMessages,
          {
            id: nanoid(),
            name: "asset_pick",
            role: "function" as const,
            content: JSON.stringify({
              isin,
              comment,
              price: lastPrices[lastPrices.length - 1],
              history: lastPrices,
            }),
          },
        ],
      };
    } catch (error) {
      console.error(error);
      return {
        messages: [
          ...chatMessages,
          {
            id: nanoid(),
            name: "asset_pick",
            role: "function" as const,
            content: JSON.stringify({
              isin,
              comment,
              price: "N/A",
              history: [],
            }),
          },
        ],
      };
    }
  } else if (functionCall.name === "user_description") {
    const userDescription = UserDescription.parse(functionCall.arguments);
    console.log(userDescription);
    return {
      messages: [
        ...chatMessages,
        {
          id: nanoid(),
          name: "user_description",
          role: "function" as const,
          content: JSON.stringify(userDescription),
        },
      ],
    };
  }
};

export function findBestFund(prefs: {
  compliance?: number;
  sustainability?: number;
  environment?: number;
  social?: number;
}, k: number) {
  const scores = Object.entries(esg).map(([isin, data]) => {
    const score = Object.entries(prefs).reduce(
      (acc, [key, value]) => acc + (value ?? 0) * (data[key] ?? 0),
      0,
    );
    return { isin, score };
  });
  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, between(k, 10, 20));
}

function between(k: number, min: number, max: number): number {
  return Math.min(Math.max(k, min), max);
}
