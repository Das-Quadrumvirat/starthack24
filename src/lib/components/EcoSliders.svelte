<script lang="ts">
	import { getAssetData, type AssetData } from '$lib/asset';
	import type { Portfolio } from '../../ambient';
	import ScoreSlider from './ScoreSlider.svelte';
	export let portfolio: Portfolio | string;
	let array;
	if (typeof portfolio === 'string') {
		array = [{ id: portfolio, amount: 1 }];
	} else {
		array = portfolio;
	}
	$: data = array.map((x) => [getAssetData(x.id), x.amount]);
	$: total = array.map((x) => x.amount).reduce((a, b) => a + b, 0);

	$: environment = data.map(([dict, weight]) => dict.environment * weight);
	$: social = data.map(([dict, weight]) => dict.social * weight);
	$: sustainability = data.map(([dict, weight]) => dict.sustainability * weight);
</script>

<ScoreSlider value={environment.reduce((a, b) => a + b, 0) / total} name={'Environment'} />
<ScoreSlider value={social.reduce((a, b) => a + b, 0) / total} name={'Social'} />
<ScoreSlider value={sustainability.reduce((a, b) => a + b, 0) / total} name={'Sustainability'} />
