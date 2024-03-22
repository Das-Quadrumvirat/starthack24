<script lang="ts">
	import { getAssetData, getAssetPrices, getDates } from '$lib/asset';
	import { complianceColor } from '$lib/colors';
  import { Chart, Card, Button, Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import type { Portfolio } from '../../ambient';

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

  export let isins: string | Portfolio
  export let title: string = 'Price';
  export let tooltip: string = 'Price';
  export let border: boolean = true;

  let selectedRange: 0 | 1 | 2 | 3 | 4 = 0;
  let dropdownOpen = false;

  let price: number;
  let options: ApexCharts.ApexOptions;

  function updateOptions(isins: string | Portfolio, tooltip: string, number_of_days: number | undefined) {
    dropdownOpen = false;

    let color: string;
    let isinsWithAmounts: Portfolio;
    if (typeof isins === 'string') {
      let { compliance } = getAssetData(isins)!;
      color = complianceColor(compliance);
      isinsWithAmounts = [{id: isins, amount: 1 }];
    } else {
      color = "#7E3AF2"
      isinsWithAmounts = isins;
    }

    let array = getAssetPrices(isinsWithAmounts.map(({ id }) => id));
    let prices = array[0].map((_, i) => array.map((row, j) => row[i] * isinsWithAmounts[j]?.amount || 0).reduce((a, b) => a + b, 0));

    price = prices[prices.length - 1];

    if (number_of_days) {
      prices = prices.slice(-number_of_days);
    }

    options = {
      chart: {
        height: '250px',
        width: '100%',
        type: 'area',
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
      fill: {
        gradient: {
          opacityFrom: 0.7,
          opacityTo: 0
        }
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
          color: color
        }
      ],
      legend: {
        show: false
      },
      xaxis: {
        categories: getDates(),
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
  }

  $: updateOptions(isins, tooltip, ranges[selectedRange].number_of_days);

  $: borderClass = border ? '' : 'border-none shadow-none';
</script>

<div class="flex w-full justify-center">
  <Card class={borderClass}>
    <div class="flex justify-between mb-5">
      <div class="grid gap-4 grid-cols-2">
        <div>
          <h5 class="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">{title}</h5>
          <p class="text-gray-900 dark:text-white text-2xl leading-none font-bold">${price.toFixed(2)}</p>
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
  </Card>
</div>
