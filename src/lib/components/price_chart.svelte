<script lang="ts">
  import { Chart, Card, Button, Dropdown, DropdownItem, Radio } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';

  export let data = [ 6500, 6418, 6456, 6526, 6356, 6456 ];
  // TODO: use timestamps, and filter dependent on the selected time range
  export let labels = ['02/01', '02/02', '02/03', '02/04', '02/05', '02/06']
  export let title: string = 'Price';
  export let value: number = 6456;

  let selectedRange: 'Last week' | '30 days' | '90 days' | 'Last year' | 'All time' = 'Last week';
  let dropdownOpen = false;

  function handleRangeSelect(event) {
    console.log('Selected range: ' + event.target.value);
    dropdownOpen = false;
  }

  let options: ApexCharts.ApexOptions = {
    chart: {
      height: '300px',
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
      curve: 'smooth'
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
        name: 'Price',
        data,
        color: '#7E3AF2'
      }
    ],
    legend: {
      show: false
    },
    xaxis: {
      categories: labels,
      labels: {
        show: false,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: true
    }
  };
</script>

<Card>
  <div class="flex justify-between mb-5">
    <div class="grid gap-4 grid-cols-2">
      <div>
        <h5 class="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">{title}</h5>
        <p class="text-gray-900 dark:text-white text-2xl leading-none font-bold">${value}</p>
      </div>
    </div>
    <div>
      <Button color="light" class="px-3 py-2">{selectedRange}<ChevronDownOutline class="w-2.5 h-2.5 ms-1.5" /></Button>
      <Dropdown class="w-40" bind:open={dropdownOpen}>
        {#each ['Last week', '30 Days', '90 Days', 'Last year', 'All time'] as range}
          <DropdownItem><Radio name="selectedRange" bind:group={selectedRange} on:change={handleRangeSelect} value={range}>{range}</Radio></DropdownItem>
        {/each}
      </Dropdown>
    </div>
  </div>
  <Chart {options} />
</Card>
