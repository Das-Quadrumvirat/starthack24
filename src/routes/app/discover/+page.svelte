<script lang="ts">
	import { findBestFund } from '$lib/ai';
  import AssetPreview from '$lib/components/asset.svelte'
	import { onMount } from 'svelte';
  import { fallbackUserDescription } from '$lib/util';

  let recommended: string[] = [];

  onMount(() => {
    try {
      const userDescriptionStr = localStorage.getItem('user_description') || JSON.stringify(fallbackUserDescription);
      if (!userDescriptionStr) { return; }
      let description = JSON.parse(userDescriptionStr);
      console.log('User description', description);
      recommended = findBestFund(description, 15).map((fund) => fund.isin);
    } catch (error) {
      console.error('Failed to load user description', error);
    }
  });
</script>

<div class="pb-20">
  {#each recommended as isin}
    <div class="pb-4">
      <AssetPreview {isin}></AssetPreview>
    </div>
  {/each}
</div>
