import { type FunctionCallHandler, nanoid } from "ai";

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
