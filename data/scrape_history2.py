"""
An example interface designed to be imported in your projects as a library.
"""
import urllib.request
import ssl
import json
from tqdm import tqdm
from ratelimit import limits, sleep_and_retry
from typing import List, Dict, Any

available_bcs = {12, 24, 34, 40, 53, 86, 87, 110, 125, 132, 134, 172, 176, 178, 179, 190, 192, 196, 200, 203, 205, 207, 209, 229, 239, 244, 245, 246, 247, 251, 253, 254, 280, 281, 282, 312, 327, 329, 332, 334, 337, 348, 370, 388, 402, 405, 416, 418, 422, 429, 430, 432, 436, 438, 439, 441, 443, 444, 450, 458, 462, 463, 466, 470, 471, 473, 474, 475, 477, 478, 485, 487, 490, 491, 493, 496, 497, 500, 501, 525, 526, 530, 547, 550, 572, 573, 603, 611, 612, 622, 639, 648, 650, 651, 656, 658, 660, 664, 665, 666, 670, 673, 674, 683, 687, 692, 694, 695, 696, 699, 704, 823, 874, 875, 1004, 1007, 1010, 1014, 1025, 1058, 1081, 1083, 1107, 1151, 1192, 1288, 1304, 1310, 1317, 1368, 1609, 1634, 1635, 1636, 1637, 1638, 1639, 1717, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 2020, 2021, 2289, 2610, 2622, 2629, 2647, 2667, 2668, 2671, 2672, 2673, 2674, 2675, 2676, 2677, 2678, 2680, 2682, 2685, 2686, 2689, 2690, 2691, 2699, 2703, 2708, 2722, 2730, 2736, 2738, 2742, 2743, 2762, 2764, 2768, 2771, 2780, 2793, 2800, 2810, 2812, 2813, 2814, 2816, 2820, 2821, 2822, 2823, 2824, 2825, 2826, 2836, 2837, 2838, 2839, 2840, 2841, 2842, 2843, 2844, 2845, 2846, 2847, 2848, 2849, 2850, 2852, 2853, 2854, 2855, 2860, 2862, 2875, 2876, 2907, 2908, 2938, 2943, 2961, 2976, 2990, 3004, 3005, 3012, 3027, 3035, 3038, 3046, 3049, 3050, 3051, 3055, 3058, 3062, 3063, 3064, 3069, 3077, 3081, 3085, 3089, 3095, 3096, 3120, 3126, 3132, 3134, 3164, 3165, 3166, 3170, 3189, 3190, 3209, 3217, 3218, 3219, 3220, 3221, 3222, 3223, 3224, 3225, 3226, 3227, 3228, 3229, 3230, 3231, 3232, 3233, 3234, 3235, 3236, 3237, 3238, 3239, 3243, 3248, 3256, 3257, 3258, 3259, 3260, 3261, 3262, 3263, 3264, 3266, 3269, 3271, 3272, 3273, 3274, 3275, 3283, 3289, 3290, 3293, 3295, 3298, 3299, 3300, 3301, 3315, 3316, 3333, 3341, 3357, 3402, 3403, 3407, 3408, 3412, 3414, 3416, 3417, 3423, 3424, 3425, 3426, 3427, 3428, 3429, 3435, 3436, 3441, 3442, 3464, 3518, 3519, 3520, 3527, 3528, 3542, 3543, 3552, 3651, 3659, 3660, 3661, 3662, 3664, 3690, 3691, 3692, 3707, 3763, 3770, 3772, 3778, 3779, 3780, 3781, 3786, 3788, 3796, 3797, 3798, 3799, 3901, 3902, 3903, 3904, 3905, 3917, 4411, 5091, 5097, 5112, 5371, 6022, 6208, 6559, 6648, 6915, 6916, 7162, 7180, 7462, 8222, 8223, 8379, 8383, 8422, 8440, 8441, 8450, 8451, 8452, 8453, 8454, 8455, 8456, 8457, 8458, 8459, 8460, 8461, 8462, 8463, 8464, 8465, 8466, 8467, 8468, 8469, 8471, 8472, 8490, 8491, 8492, 8493, 8500, 8501, 8502, 8503, 8504, 8505, 8506, 8507, 8509, 8510, 8511, 8512, 8513, 8514, 8515, 8517, 8519, 8520, 8521, 8530, 8531, 8532, 8533, 8534, 8535, 8536, 8537, 8538, 8540, 8541, 8543, 8544, 8545, 8547, 8548, 8550, 8600, 9698, 9699}



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

    def instrumentMarket(self, scheme: str, instruments: List[str]) -> Dict[str, Any]:
        """
        Retrieve instrument basic attributes using scheme and ids.
        """
        end_point = "/v1/instruments/referenceData/instrumentMarkets"
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
            'dateTo': dateTo,
            'priceAdjustment': 'ADJUSTED',
        }
        return self._http_request(end_point, query_string)



apis = []
for i in range(10):
    findata = FinancialDataAPI(f"CH52991-hackathon{i + 1}")
    apis.append(findata)

current_api = 0

cres = {}
with open("possible_bcs.json", "r") as file:
    data = json.load(file)
    isins = list(data.keys())
    # block_size = 10
    # blocks = [isins[i:i+block_size] for i in range(0, len(isins), block_size)]
    # for block in blocks:
    for isin in tqdm(isins):
        poss_isin_bcs = [isin + "_" + str(bc) for bc in data[isin]]
        try:
            res = apis[current_api := (current_api + 1) % 10].endOfDayHistory("ISIN_BC", poss_isin_bcs, "2023-01-01")
            for idx, bc in enumerate(data[isin]):
                try:
                    values = res["data"]["listings"][idx]["marketData"]["endOfDayHistory"] 
                    if len(values) != 0:
                        cres[isin] = {
                            'bc': bc,
                            'dates': list(map(lambda x: x["sessionDate"], values)),
                            'values': list(map(lambda x: x["last"], values)),
                        }
                        print(f"did find data for ISIN {isin} with bc {bc}")
                        with open("actual_history.json", "w") as file:
                            json.dump(cres, file)
                        break
                except KeyError as e:
                    print(f"There was a key_error: {e}")
            else:
                print(f"did not find anything for ISIN {isin} and bc's {data[isin]}")
                cres[isin] = {
                    'found': False,
                }
        except Exception as e:
            print(f"There has been an error: {e}")

