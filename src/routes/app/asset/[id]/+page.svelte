<script lang="ts">
	import { Card } from "flowbite-svelte";

  import ComplianceMeter from "$lib/components/compliance_meter.svelte";
  import PriceChart from "$lib/components/price_chart.svelte";
  import OrderModal from '$lib/components/OrderModal.svelte';

  let asset: Asset = {
    id: "1h892ja",
    name: "Unicorn horns",
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
<OrderModal bind:open={showSellModal} action="Sell" price={asset.price} on:confirm={handleConfirm} />

<div class="w-full flex justify-center pb-20">
  <Card size="lg" class="p-4 bg-white rounded-lg border border-gray-200 shadow-md">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl text-black pb-2 overflow-x-auto w-3/5 text-nowrap">{asset.name}</h2>
      <ComplianceMeter level={asset.compliance}></ComplianceMeter>
    </div>
    <div class="mt-2">
      <div class="flex justify-between mb-2">
        <button on:click={buy} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Buy</button>
        <button on:click={sell} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600">Sell</button>
      </div>
      <p class="mb-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe reprehenderit voluptatibus magnam minima sapiente dignissimos exercitationem cupiditate, explicabo facere, repellat commodi enim asperiores inventore maxime cumque illo nobis quis nostrum.</p>
      <PriceChart></PriceChart>
    </div>
  </Card>
</div>
