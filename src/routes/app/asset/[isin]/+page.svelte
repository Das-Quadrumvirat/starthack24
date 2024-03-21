<script lang="ts">
	import { Card } from "flowbite-svelte";

  import ComplianceMeter from "$lib/components/compliance_meter.svelte";
  import PriceChart from "$lib/components/price_chart.svelte";
  import OrderModal from '$lib/components/OrderModal.svelte';

  export let data;

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

<OrderModal bind:open={showBuyModal} action="Buy" price={data.price} on:confirm={handleConfirm} />
<OrderModal bind:open={showSellModal} action="Sell" price={data.price} on:confirm={handleConfirm} />

<div class="w-full flex justify-center pb-20">
  <Card size="lg" class="p-4 bg-white rounded-lg border border-gray-200 shadow-md">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl text-black pb-2 overflow-x-auto w-3/5 text-nowrap">{data.name}</h2>
      <ComplianceMeter level={data.compliance}></ComplianceMeter>
    </div>
    <div class="mt-2">
      <div class="flex justify-between mb-2">
        <button on:click={buy} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Buy</button>
        <button on:click={sell} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600">Sell</button>
      </div>
      <PriceChart isin={data.isin}></PriceChart>
    </div>
  </Card>
</div>
