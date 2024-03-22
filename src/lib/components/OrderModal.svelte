<script lang="ts">
	import { Modal } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';
  import { getPortfolioEntry, tradeAssets } from '$lib/portfolio';

  export let action: 'Buy' | 'Sell' = 'Buy';
  export let data: { id: string, name: string, price: number }
  export let open = false;

  let price = data.price;
  let amount = '';
  const dispatch = createEventDispatcher();

  function warn(message: string) {
    alert(message);
  }

  let portfolioEntry = getPortfolioEntry(data.id);

  function confirmOrder() {
    let count: number = +amount;
    if (isNaN(count) || count <= 0) {
      warn('Invalid amount');
      return;
    }

    if (action === 'Sell' && count > $portfolioEntry.amount) {
      warn('Not enough shares to sell.');
      return;
    }
    if (action === 'Sell') count = -count;

    tradeAssets(data.id, count);

    dispatch('confirm', { action, amount: count });
    amount = '';
  }

  function keyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      confirmOrder();
    }
  }
</script>

<Modal title="{action} Order" bind:open={open} autoclose>
  <div class="flex justify-between">
    <p class="py-4">You own {$portfolioEntry.amount}</p>
    <p class="py-4">Price: ${price}</p>
  </div>
  <input type="number" on:keydown={keyDown} bind:value={amount} min="0" max={action === 'Buy' ? '999999' : $portfolioEntry.amount} class="w-full px-3 py-2 border rounded" placeholder="Amount" />
  <button on:click={confirmOrder} class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Confirm</button>
</Modal>
