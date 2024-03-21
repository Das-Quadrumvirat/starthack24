import { data, dates } from "$lib/sources/final_final.json";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
  if (data.hasOwnProperty(params.isin)) {
    const response: Data = {
      ...(data as any)[params.isin] as Data,
    };
    const outerResponse: Result = {
      dates: dates,
      data: response,
    };
    return new Response(JSON.stringify(outerResponse));
  } else {
    throw error(404, `Could not find ISIN ${params.isin}`);
  }
};
