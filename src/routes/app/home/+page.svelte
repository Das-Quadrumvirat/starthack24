<script>
  import PriceChart from '$lib/components/price_chart.svelte';

  let portfolio = [
    { isin: 'AT0000784756', weight: 1 },
    { isin: 'AT0000785340', weight: 1 },
    { isin: 'AT0000801097', weight: 4 },
    { isin: 'AT0000828553', weight: 7 },
  ]
</script>

<div class="pb-20">
  <h1 class="text-5xl pb-5">Home</h1>
  <PriceChart title="Your Balance" tooltip="Balance" isins={portfolio} />
</div>
