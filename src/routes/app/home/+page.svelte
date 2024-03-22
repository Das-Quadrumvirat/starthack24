<script>
	import PriceChart from '$lib/components/price_chart.svelte';
	import { portfolio } from '$lib/portfolio';
	import EcoSliders from '$lib/components/EcoSliders.svelte';

	console.log($portfolio)
</script>

<div class="pb-20">
	<EcoSliders portfolio={$portfolio} />
	<PriceChart title="Your Balance" tooltip="Balance" isins={$portfolio} />
</div>
