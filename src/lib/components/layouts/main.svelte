<script>
	import BottomNav from "../layout/bottom_nav.svelte";
</script>

<style>
  .container {
    height: calc(100% - 4rem);
  }
</style>

<BottomNav />

<div class="container">
  <slot />
</div>
