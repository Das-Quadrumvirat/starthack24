<script lang="ts">
  import AssetPreview from '$lib/components/asset.svelte'

  let recommended = [
    'AT0000784756',
    'AT0000785340',
    'AT0000801097',
    'AT0000828553',
  ]
</script>

<h1 class="text-black text-4xl pb-5">Recommended</h1>

<div class="pb-20">
  {#each recommended as isin}
    <div class="pb-4">
      <AssetPreview {isin}></AssetPreview>
    </div>
  {/each}
</div>
