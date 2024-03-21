import { dates, data } from "./sources/final_final.json";

type AssetData = {
	name: string;
	compliance: 0 | 1 | 2 | 3;
	sustainability: number;
	environment: number;
	social: number;
    ISIN: string;
	shortName: string;
    prices: number[];
}

export function getDates(): string[] {
    return dates;
}

export function getAssetData(isin: string): AssetData | undefined {
    return data[isin];
}

export function getAssetPrices(isins: string[]): number[][] {
    return isins.map(isin => data[isin].prices);
}
