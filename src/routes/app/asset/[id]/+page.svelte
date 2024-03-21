<script lang="ts">
	import { Card } from 'flowbite-svelte';

	import ComplianceMeter from '$lib/components/compliance_meter.svelte';
	import PriceChart from '$lib/components/price_chart.svelte';
	import OrderModal from '$lib/components/OrderModal.svelte';

	let asset: Asset = {
		id: '1h892ja',
		name: 'Unicorn horns',
		compliance: 3,
		price: 50000
	};

	let showBuyModal = false;
	let showSellModal = false;

	function handleConfirm(event) {
		const { action, amount } = event.detail;
		console.log(`${action} confirmed for amount: ${amount}`);
		showBuyModal = false;
		showSellModal = false;
	}

	function buy() {
		showBuyModal = true;
	}

	function sell() {
		showSellModal = true;
	}
</script>

<OrderModal bind:open={showBuyModal} action="Buy" price={asset.price} on:confirm={handleConfirm} />
<OrderModal
	bind:open={showSellModal}
	action="Sell"
	price={asset.price}
	on:confirm={handleConfirm}
/>

<div class="flex w-full justify-center pb-20">
	<Card size="lg" class="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
		<div class="flex items-center justify-between">
			<h2 class="w-3/5 overflow-x-auto text-nowrap pb-2 text-2xl text-black">{asset.name}</h2>
			<ComplianceMeter level={asset.compliance}></ComplianceMeter>
		</div>
		<div class="mt-2">
			<div class="mb-2 flex justify-between">
				<button on:click={buy} class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
					>Buy</button
				>
				<button on:click={sell} class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-red-600"
					>Sell</button
				>
			</div>
			<p class="mb-2">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe reprehenderit voluptatibus
				magnam minima sapiente dignissimos exercitationem cupiditate, explicabo facere, repellat
				commodi enim asperiores inventore maxime cumque illo nobis quis nostrum.
			</p>
			<PriceChart></PriceChart>
		</div>
	</Card>
</div>
