<script lang="ts">
	import { Chart, Card } from "flowbite-svelte";

  import ComplianceMeter from "$lib/components/compliance_meter.svelte";
	import { complianceColor } from "$lib/colors";
	import { getPortfolioEntry } from "$lib/portfolio";

  export let isin: string;
  export let border = true;
  export let transparent = false;

  let portfolioEntry = getPortfolioEntry(isin);

  $: promise = (async function getOptions(isin: string): Promise<{
      name: string,
      price: number,
      compliance: 0 | 2 | 1 | 3,
      options: ApexCharts.ApexOptions
    }> {
    const response = await fetch(`/api/asset/${isin}`);
    let { dates, data } = await response.json();

    let prices = data.prices.slice(-30);
    dates = dates.slice(-30);

    let options: ApexCharts.ApexOptions = {
      chart: {
        height: '40px',
        width: '100%',
        type: 'area',
        dropShadow: {
          enabled: false
        },
        sparkline: {
          enabled: true
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        animations: {
          enabled: false
        }
      },
      tooltip: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: 'monotoneCubic'
      },
      series: [
        {
          name: 'Price',
          data: prices,
          color: complianceColor(data.compliance)
        }
      ],
      fill: {
        gradient: {
          opacityFrom: 0.7,
          opacityTo: 0
        }
      }
    };

    return {
      name: data.name,
      price: prices[prices.length - 1],
      compliance: data.compliance,
      options
    };
  })(isin);

  $: borderClass = border ? '' : 'border-none shadow-none';
  $: bgClass = transparent ? 'bg-transparent' : 'bg-white';
</script>

{#await promise then { name, price, compliance, options }}
  <div class="w-full flex justify-center">
    <Card href="/app/asset/{isin}" size="lg" class={`p-4 rounded-lg border border-gray-200 shadow-md ${borderClass} ${bgClass}`}>
      <div class="flex justify-between items-center space-x-4">
        <h2 class="text-xl text-black pb-2 overflow-x-auto grow text-nowrap">{name}</h2>
        <ComplianceMeter level={compliance}></ComplianceMeter>
      </div>
      <div class="mt-2">
        <div class="flex justify-between">
          <p class="text-gray-700 text-sm">{#if $portfolioEntry.amount > 0}You own {$portfolioEntry.amount}{/if}</p>
          <p class="text-gray-700 text-sm">${price.toFixed(2)}</p>
        </div>
        <Chart {options}></Chart>
      </div>
    </Card>
  </div>
{:catch error}
  <p>{error.message}</p>
{/await}
