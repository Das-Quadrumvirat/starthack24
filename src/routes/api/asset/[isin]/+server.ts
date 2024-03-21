import { error, type RequestHandler } from "@sveltejs/kit";
import data from "$lib/sources/data.json";
import private_key from "$lib/sources/private-key.pem?raw";
import signed_certificate from "$lib/sources/signed-certificate.pem?raw";
type Params = {
  isin: string
}
import * as https from 'https';
import { URL, URLSearchParams } from 'url';

class APIError extends Error {
  correlationId?: string;

  constructor(message: string, correlationId?: string) {
    super(message);
    this.correlationId = correlationId;
    this.name = 'APIError';
  }
}

interface ApiResponse {
  [key: string]: any;
}

class FinancialDataAPI {
  private url: string = 'https://web.api.six-group.com/api/findata';
  private headers: https.RequestOptions['headers'];
  private agent: https.Agent;

  constructor() {
    this.headers = {
      "accept": "application/json"
    };
    this.agent = new https.Agent({
      cert: signed_certificate,
      key: private_key,
    });
  }

  private async httpRequest(endPoint: string, queryString: Record<string, any>): Promise<ApiResponse> {
    const completeUrl = new URL(`${this.url}${endPoint}`);
    completeUrl.search = new URLSearchParams(queryString).toString();

    return new Promise((resolve, reject) => {
      const options: https.RequestOptions = {
        headers: this.headers,
        agent: this.agent
      };

      https.get(completeUrl.toString(), options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new APIError('Failed to parse JSON response.'));
          }
        });
      }).on('error', (err) => {
        if (err instanceof Error) {
          reject(new APIError(err.message));
        } else {
          reject(new APIError('An unknown network error occurred.'));
        }
      });
    });
  }

  private async httpRequestWithSchemeId(endPoint: string, scheme: string, ids: string[]): Promise<ApiResponse> {
    const queryString = {
      'scheme': scheme,
      'ids': ids.join(",")
    };
    return this.httpRequest(endPoint, queryString);
  }

  public async instrumentBase(scheme: string, instruments: string[]): Promise<ApiResponse> {
    const endPoint = "/v1/instruments/referenceData/instrumentBase";
    return this.httpRequestWithSchemeId(endPoint, scheme, instruments);
  }

  public async endOfDayHistory(scheme: string, listings: string[], dateFrom: string, dateTo: string = ''): Promise<ApiResponse> {
    const endPoint = "/v1/listings/marketData/endOfDayHistory";
    const queryString = {
      'scheme': scheme,
      'ids': listings.join(","),
      'dateFrom': dateFrom,
      'dateTo': dateTo
    };
    return this.httpRequest(endPoint, queryString);
  }
}

const findata = new FinancialDataAPI();

export const GET: RequestHandler<Params> = async ({ params }: { params: Params }) => {
  // if (data.hasOwnProperty(params.isin)) {
    try {
    const sample1 = await findata.endOfDayHistory("ISIN_BC", [params.isin], "2024-01-01");
    console.log(JSON.stringify(sample1, null, 4));
    return new Response(JSON.stringify(sample1, null, 4));
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`APIError: ${error.message}`, error.correlationId);
    } else {
      console.error(error);
    }
  }
  //   const response: Asset = {
  //     id: params.isin,
  //     price: 0,
  //     ...(data as any)[params.isin]
  //   };
  //   return new Response(JSON.stringify(response));
  // }
  // else {
    return new Response(error(404, `Could not find ISIN ${params.isin}`));
  // }
};
