<script lang="ts">
  import { Chart, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  let rows = [
    { name: "You", returns: 115, environmental: 87 },
    { name: "John", returns: 220, environmental: 16 },
    { name: "Lena", returns: 160, environmental: 70 },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: '300px',
      width: '100%',
      type: 'bar',
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
      enabled: false
    },
    grid: {
      show: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: rows.map(row => row.name)
    }
  };

  let environmentalOptions = Object.assign({}, options);
  environmentalOptions.series = [
    {
      name: 'Environmental',
      data: rows.map(row => row.environmental),
      color: '#00D050'
    }
  ];
  environmentalOptions.dataLabels = {
    enabled: true,
    formatter: (val) => `${val}%`
  };
  environmentalOptions.yaxis = {
    show: true,
    labels: {
      formatter: (val) => `${val}%`
    }
  };
  environmentalOptions.fill = {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      colorStops: [
        {
          offset: 0,
          color: '#00F020',
          opacity: 1
        },
        {
          offset: 100,
          color: '#00D050',
          opacity: 1
        }
      ]
    }
  };

  let returnsOptions = Object.assign({}, options);
  returnsOptions.series = [
    {
      name: 'Returns',
      data: rows.map(row => row.returns),
      color: '#FF5000'
    }
  ];
  returnsOptions.dataLabels = {
    enabled: true,
    formatter: (val) => `$${val}`
  };
  returnsOptions.yaxis = {
    show: true,
    labels: {
      formatter: (val) => `$${val}`
    }
  };
  returnsOptions.fill = {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      colorStops: [
        {
          offset: 0,
          color: '#FF8000',
          opacity: 1
        },
        {
          offset: 100,
          color: '#FF5000',
          opacity: 1
        }
      ]
    }
  };
</script>

<div class="pb-20">
  <h2 class="text-2xl font-bold pb-4">Environmental</h2>
  <Chart options={environmentalOptions} />
  <h2 class="text-2xl font-bold py-4">Returns</h2>
  <Chart options={returnsOptions} />
</div>
