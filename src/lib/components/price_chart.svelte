<script lang="ts">
	import { complianceColor } from '$lib/colors';
  import { Chart, Card, Button, Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';

  const ranges: ({
    short_desc: string;
    long_desc: string;
    number_of_days?: number;
  })[] = [
    { short_desc: '1w', long_desc: 'Last Week', number_of_days: 7 },
    { short_desc: '1m', long_desc: 'Last Month', number_of_days: 30 },
    { short_desc: '3m', long_desc: 'Last 3 Months', number_of_days: 3 * 30 },
    { short_desc: '6m', long_desc: 'Last 6 Months', number_of_days: 6 * 30 },
    { short_desc: '1y', long_desc: 'Last Year' }
  ];

  export let isin: string;
  export let title: string = 'Price';
  export let tooltip: string = 'Price';

  let selectedRange: 0 | 1 | 2 | 3 | 4 = 0;
  let dropdownOpen = false;

  $: promise = (async function getOptions(isin: string, tooltip: string, number_of_days: number | undefined): Promise<{
      price: number,
      options: ApexCharts.ApexOptions
    }> {
    dropdownOpen = false;

    const response = await fetch(`/api/asset/${isin}`);
    const { dates, data } = await response.json();

    let prices = data.prices;

    if (number_of_days) {
      prices = prices.slice(-number_of_days);
    }

    let options: ApexCharts.ApexOptions = {
      chart: {
        height: '250px',
        width: '100%',
        type: 'line',
        fontFamily: 'Inter, sans-serif',
        dropShadow: {
          enabled: false
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
        enabled: true,
        x: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 4,
        curve: 'monotoneCubic'
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -26
        }
      },
      series: [
        {
          name: tooltip,
          data: prices,
          color: complianceColor(data.compliance)
        }
      ],
      legend: {
        show: false
      },
      xaxis: {
        categories: dates,
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: true,
        labels: {
          formatter: (val) => '$' + val.toFixed(2)
        }
      }
    };

    return {
      price: prices[prices.length - 1],
      options
    };
  })(isin, tooltip, ranges[selectedRange].number_of_days);
</script>

<Card>
  {#await promise}
  <p>Loading...</p>
  {:then { price, options} }
    <div class="flex justify-between mb-5">
      <div class="grid gap-4 grid-cols-2">
        <div>
          <h5 class="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">{title}</h5>
          <p class="text-gray-900 dark:text-white text-2xl leading-none font-bold">{price}</p>
        </div>
      </div>
      <div>
        <Button color="light" class="px-3 py-2">{ranges[selectedRange].short_desc}<ChevronDownOutline class="w-2.5 h-2.5 ms-1.5" /></Button>
        <Dropdown class="w-40" bind:open={dropdownOpen}>
          {#each ranges as { long_desc }, index }
            <DropdownItem><Radio name="selectedRange" bind:group={selectedRange} value={index}>{long_desc}</Radio></DropdownItem>
          {/each}
        </Dropdown>
      </div>
    </div>
    <Chart {options} />
  {:catch error}
    <p>Error: {error.message}</p>
  {/await}
</Card>
