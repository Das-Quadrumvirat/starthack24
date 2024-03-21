<script>
  import TopBar from "../layout/top_bar.svelte";

  import { page } from "$app/stores";

  let onboarding = false
  $: onboarding = !$page.url.pathname.startsWith('/app')
</script>

<style>
  main {
    height: calc(100vh - 4rem);
  }
</style>

<TopBar>
  {#if onboarding}
    <a href="/app/home">Skip</a>
  {/if}
</TopBar>

<main class="p-6 pb-2 lg:m-auto lg:max-w-3xl">
  <slot />
</main>
