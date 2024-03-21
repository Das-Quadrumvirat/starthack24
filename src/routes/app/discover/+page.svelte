<script lang="ts">
	import { findBestFund } from '$lib/ai';
  import AssetPreview from '$lib/components/asset.svelte'
	import { UserDescription } from '$lib/types';
	import { onMount } from 'svelte';

  let recommended: string[] = [];

  onMount(() => {
    try {
      const userDescriptionStr = localStorage.getItem('user_description');
      if (!userDescriptionStr) { return; }
      let description = JSON.parse(userDescriptionStr);
      recommended = findBestFund(description, 10).map((fund) => fund.isin);
    } catch (error) {
      console.error('Failed to load user description', error);
    }
  });
</script>

<h1 class="text-black text-4xl pb-5">Recommended</h1>

<div class="pb-20">
  {#each recommended as isin}
    <div class="pb-4">
      <AssetPreview {isin}></AssetPreview>
    </div>
  {/each}
</div>
