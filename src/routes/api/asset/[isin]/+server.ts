import { error, type RequestHandler } from "@sveltejs/kit";
import data from "$lib/sources/data.json";
type Params = {
  isin: string
}

export const GET: RequestHandler<Params> = async ({ params }: { params: Params }) => {
  if (data.hasOwnProperty(params.isin)) {
    return new Response(JSON.stringify((data as any)[params.isin]));
  }
  else {
    return new Response(error(404, `Could not find ISIN ${params.isin}`));
  }
};
