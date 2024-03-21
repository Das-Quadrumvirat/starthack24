import { dates, data } from "$lib/sources/final_final.json";
import { error, type RequestHandler } from "@sveltejs/kit";

type Params = {
  isin: string
}
export const GET = (async ({ params }: { params: Params }) => {
  if (data.hasOwnProperty(params.isin)) {
    const response: Data = {
      ...(data as any)[params.isin] as Data
    };
    const outerResponse: Result = {
      dates: dates,
      data: response,
    };
    return new Response(JSON.stringify(outerResponse));
  } else {
    return new Response(error(404, `Could not find ISIN ${params.isin}`))
  }
}) satisfies RequestHandler<Params>;
