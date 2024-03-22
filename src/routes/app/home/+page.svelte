<script>
  import PriceChart from '$lib/components/price_chart.svelte';
	import { portfolio } from '$lib/portfolio';
  import ScoreSlider from '$lib/components/ScoreSlider.svelte';
</script>

<div class="pb-20">
  <ScoreSlider value={0.2} name={"Social Score"}/>
  <ScoreSlider value={0.7} name={"Environmental Score"}/>
  <ScoreSlider value={1.0} name={"Sustainability Score"}/>
  <PriceChart title="Your Balance" tooltip="Balance" isins={$portfolio} />
</div>
