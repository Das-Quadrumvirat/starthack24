import { type FunctionCallHandler, nanoid } from "ai";
import esg from "$lib/data/data.json";

export interface StockPick {
  isin: string;
  comment: string;
}

export const clientFunctionCallHandler: FunctionCallHandler = async (
  chatMessages,
  functionCall,
) => {
  if (functionCall.name === "stock_pick") {
    const parsedFunctionCallArguments = JSON.parse(functionCall.arguments!);
    const isin = parsedFunctionCallArguments.isin;
    const comment = parsedFunctionCallArguments.comment;
    return {
      messages: [
        ...chatMessages,
        {
          id: nanoid(),
          name: "stock_pick",
          role: "function" as const,
          content: JSON.stringify({
            isin,
            comment,
            price: "100.00",
            history: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
          }),
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
