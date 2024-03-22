<script lang="ts">
  import AssetPreview from '$lib/components/asset.svelte'
  import { portfolio } from '$lib/portfolio'

</script>

<div class="pb-20">
  <h1 class="text-black text-4xl pb-5">Your Portfolio</h1>

  {#each $portfolio as { id, weight }}
    <div class="pb-4">
      <AssetPreview isin={id}></AssetPreview>
    </div>
  {/each}
</div>
