import { complianceColor } from '$lib/colors.js';

export async function load({ fetch, params }) {
    const response = await fetch(`/api/asset/${params.isin}`);
    let { dates, data } = await response.json();

    return {
        isin: params.isin,
        name: data.name,
        price: data.prices[data.prices.length - 1],
        compliance: data.compliance
    };
}
