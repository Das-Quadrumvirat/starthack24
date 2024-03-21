<script lang="ts">
	import { Card } from "flowbite-svelte";

  import ComplianceMeter from "$lib/components/compliance_meter.svelte";
  import PriceChart from "$lib/components/price_chart.svelte";

  let asset: Asset = {
    id: "1h892ja",
    name: "Unicorn horns",
    compliance: 3,
    price: 50000
  };
</script>

<div class="w-full flex justify-center">
  <Card size="lg" class="p-4 bg-white rounded-lg border border-gray-200 shadow-md">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl text-black pb-2 overflow-x-auto w-3/5 text-nowrap">{asset.name}</h2>
      <ComplianceMeter level={asset.compliance}></ComplianceMeter>
    </div>
    <div class="mt-2">
      <p class="mb-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe reprehenderit voluptatibus magnam minima sapiente dignissimos exercitationem cupiditate, explicabo facere, repellat commodi enim asperiores inventore maxime cumque illo nobis quis nostrum.</p>
      <PriceChart></PriceChart>
    </div>
  </Card>
</div>
