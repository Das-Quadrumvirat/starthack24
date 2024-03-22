import { complianceColor } from '$lib/colors.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const response = await fetch(`/api/asset/${params.isin}`);
    if (!response.ok) {
        error(response.status, `Could not find ISIN ${params.isin}`);
    }
    let { data } = await response.json();

    return {
        id: params.isin,
        name: data.name,
        price: data.prices[data.prices.length - 1],
        compliance: data.compliance
    };
}
