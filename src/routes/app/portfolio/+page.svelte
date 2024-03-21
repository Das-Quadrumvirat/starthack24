<script lang="ts">
  import AssetPreview from '$lib/components/asset.svelte'

  let portfolio = [
    { isin: 'AT0000784756', weight: 1 },
    { isin: 'AT0000785340', weight: 1 },
    { isin: 'AT0000801097', weight: 4 },
    { isin: 'AT0000828553', weight: 7 },
  ];
</script>

<div class="pb-20">
  <h1 class="text-black text-4xl pb-5">Your Portfolio</h1>

  {#each portfolio as { isin, weight }}
    <div class="pb-4">
      <AssetPreview {isin}></AssetPreview>
    </div>
  {/each}
</div>
