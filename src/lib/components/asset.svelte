<script lang="ts">
	import { Chart, Card } from "flowbite-svelte";

  import ComplianceMeter from "$lib/components/compliance_meter.svelte";
	import { complianceColor } from "$lib/colors";

  export let isin: string;

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
        type: 'line',
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
    };

    console.log(options);

    return {
      name: data.name,
      price: prices[prices.length - 1],
      compliance: data.compliance,
      options
    };
  })(isin);
</script>

{#await promise}
  <p>Loading...</p>
{:then { name, price, compliance, options }}
  <div class="w-full flex justify-center">
    <Card href="/app/asset/{isin}" size="lg" class="p-4 bg-white rounded-lg border border-gray-200 shadow-md">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl text-black pb-2 overflow-x-auto w-3/5 text-nowrap">{name}</h2>
        <ComplianceMeter level={compliance}></ComplianceMeter>
      </div>
      <div class="mt-2">
        <p class="text-gray-700 text-sm">${price}</p>
        <Chart {options}></Chart>
      </div>
    </Card>
  </div>
{:catch error}
  <p>{error.message}</p>
{/await}
