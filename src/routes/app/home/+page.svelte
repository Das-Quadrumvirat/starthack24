<script>
  import PriceChart from '$lib/components/price_chart.svelte';
  import ScoreSlider from '$lib/components/ScoreSlider.svelte';

  let portfolio = [
    { isin: 'AT0000784756', weight: 1 },
    { isin: 'AT0000785340', weight: 1 },
    { isin: 'AT0000801097', weight: 4 },
    { isin: 'AT0000828553', weight: 7 },
  ]
</script>

<div class="pb-20">
  <ScoreSlider value={0.2} name={"Social Score"}/>
  <ScoreSlider value={0.7} name={"Environmental Score"}/>
  <ScoreSlider value={1.0} name={"Sustainability Score"}/>
  <PriceChart title="Your Balance" tooltip="Balance" isins={portfolio} />
</div>
