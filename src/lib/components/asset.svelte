<script lang="ts">
	import { Heading, P, Card } from "flowbite-svelte";

  import ComplianceMeter from "$lib/components/compliance_meter.svelte";

  export let asset: Asset;
</script>

<Card href="/app/asset" class="p-4 bg-white rounded-lg border border-gray-200 shadow-md">
  <div class="flex justify-between items-center">
    <h2 class="text-2xl text-black pb-2 overflow-x-auto w-3/5 text-nowrap">{asset.name}</h2>
    <ComplianceMeter level={asset.compliance}></ComplianceMeter>
  </div>
  <div class="mt-2">
    <p class="text-gray-700 text-sm">${asset.price}</p>
    <p>Here be a price chart</p>
  </div>
</Card>
