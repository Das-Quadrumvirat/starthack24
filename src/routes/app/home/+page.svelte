<script>
  import PriceChart from '$lib/components/price_chart.svelte';
	import { portfolio } from '$lib/portfolio';
</script>

<div class="pb-20">
  <h1 class="text-5xl pb-5">Home</h1>
  <PriceChart title="Your Balance" tooltip="Balance" isins={$portfolio} />
</div>
