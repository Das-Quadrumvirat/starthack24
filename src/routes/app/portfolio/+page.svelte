<script lang="ts">
  import AssetPreview from '$lib/components/asset.svelte'

  let assets: Asset[] = [
    { id: 'yeet', name: 'yeet omg this name is so long I hate my existence', price: 1337, compliance: 0 },
    { id: 'doot', name: 'doot', price: 1337, compliance: 1 },
    { id: 'beep', name: 'beep', price: 1337, compliance: 2 },
    { id: 'boop', name: 'boop', price: 1337, compliance: 3 },
  ];
</script>

<h1 class="text-black text-4xl pb-5">Your Portfolio</h1>

{#each assets as asset}
  <div class="pb-4">
    <AssetPreview {asset}></AssetPreview>
  </div>
{/each}

