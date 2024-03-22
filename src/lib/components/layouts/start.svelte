<script>
  import TopBar from "../layout/top_bar.svelte";
  import { page } from "$app/stores";
  $: title = $page.data.title;
</script>

<style>
  main {
    height: calc(100vh - 4rem); /* in case the line below doesn't work */
    height: calc(100dvh - 4rem);
  }
</style>

<TopBar>
  {#if title}
    <h1 class="text-2xl">{title}</h1>
  {/if}
</TopBar>

<main class="p-6 pb-2 lg:m-auto lg:max-w-3xl">
  <slot />
</main>
