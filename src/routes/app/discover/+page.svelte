<script lang="ts">
	import { findBestFund } from '$lib/ai';
  import AssetPreview from '$lib/components/asset.svelte'
	import { onMount } from 'svelte';
  import { Search } from 'flowbite-svelte';
  import FuzzySearch from 'fuzzy-search';
  import data from '$lib/sources/data.json';
  import { fallbackUserDescription } from '$lib/util';

  const searchData = Object.values(data).map(({ name, isin }) => ({ name: name, isin: isin }));
  const searcher = new FuzzySearch(searchData, ['name', 'isin'], {
    caseSensitive: false,
    sort: true,
  });

  let searchValue = '';

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


  let searched: string[];
  $: if (searchValue) {
    searched = searcher.search(searchValue).map(({ isin }) => isin);
  } else {
    searched = [];
  }
</script>

<div class="pb-20">
  <div class="pb-4">
    <Search bind:value={searchValue}></Search>
  </div>

  {#if searchValue}
    {#each searched.slice(0, 20) as isin}
      <div class="pb-4">
        <AssetPreview {isin}></AssetPreview>
      </div>
    {/each}
  {:else}
    <h2 class="text-2xl font-bold pb-4">Recommended for you</h2>
    {#each recommended as isin}
      <div class="pb-4">
        <AssetPreview {isin}></AssetPreview>
      </div>
    {/each}
  {/if}
</div>
