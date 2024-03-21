"""
An example interface designed to be imported in your projects as a library.
"""
import urllib.request
import ssl
import json
from tqdm import tqdm
from ratelimit import limits, sleep_and_retry
from typing import List, Dict, Any

class APIError(Exception):
    def __init__(self, message: str, correlation_id: str = None):
        self.message = message
        self.correlation_id = correlation_id
        super().__init__(message)


class FinancialDataAPI:
    def __init__(self, certificate_path: str):
        self.url = 'https://web.api.six-group.com/api/findata'
        self.headers = {
            "accept": "application/json"
        }
        self.context = ssl.SSLContext()
        self.context.load_cert_chain(f'{certificate_path}/signed-certificate.pem', f'{certificate_path}/private-key.pem')

    def _http_request(self, end_point: str, query_string: Dict[str, Any]) -> Dict[str, Any]:
        """
        Make an HTTP request and send the raw response.
        """
        complete_url = f"{self.url}{end_point}?{urllib.parse.urlencode(query_string)}"
        try:
            request = urllib.request.Request(complete_url, headers=self.headers)
            with urllib.request.urlopen(request, context=self.context) as response:
                return json.loads(response.read())
        except urllib.error.HTTPError as err:
            correlation_id = err.headers.get('X-CorrelationID')
            raise APIError("An error occurred during the API request.", correlation_id) from err

    def _http_request_with_scheme_id(self, end_point: str, scheme: str, ids: List[str]) -> Dict[str, Any]:
        """
        Make an HTTP request using scheme and ids.
        """
        query_string = {
            'scheme': scheme,
            'ids': ",".join(ids)
        }
        return self._http_request(end_point, query_string)

    def instrumentBase(self, scheme: str, instruments: List[str]) -> Dict[str, Any]:
        """
        Retrieve instrument basic attributes using scheme and ids.
        """
        end_point = "/v1/instruments/referenceData/instrumentBase"
        return self._http_request_with_scheme_id(end_point, scheme, instruments)

    def endOfDayHistory(self, scheme: str, listings: List[str], dateFrom: str, dateTo: str = '') -> Dict[str, Any]:
        """
        Retrieve End of Day Timeseries data.
        """
        end_point = "/v1/listings/marketData/endOfDayHistory"
        query_string = {
            'scheme': scheme,
            'ids': ",".join(listings),
            'dateFrom': dateFrom,
            'dateTo': dateTo
        }
        return self._http_request(end_point, query_string)



apis = []
for i in range(10):
    findata = FinancialDataAPI(f"CH52991-hackathon{i + 1}")
    apis.append(findata)

with open("data.json", "rb") as file:
    isins = json.load(file)
isins = [key for key in isins.keys()]
print(isins)

current_api = 0
@sleep_and_retry
@limits(calls=40, period=1)
def find_isin_bc(isin: str) -> str:
    global current_api
    api = apis[current_api]
    current_api = (current_api + 1) % 10
    try:
        res = api.instrumentBase("ISIN", [isin])
        name = res["data"]["instruments"][0]["lookup"]["instrumentShortName"]
        return name
    except APIError as error:
        print(error)

    return None

    
res = {}
for isin in tqdm(isins[:-1]):
    name = find_isin_bc(isin)
    print(f"{isin}: {name}")
    res[isin] = name

with open("names.json", "w") as file:
    json.dump(res, file)




# print(json.dumps(sample1, sort_keys=True, indent=4))
