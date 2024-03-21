<script lang="ts">
	export let json: string;

	console.log(json);

	const { isin, comment, price } = JSON.parse(json);
</script>

<div>
	<div>
		<p>{isin}</p>
		<p>{comment}</p>
		<p>{price}</p>
	</div>
	<div>
		<button>Buy</button>
		<button>Sell</button>
	</div>
</div>
