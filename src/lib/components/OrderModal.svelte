<script lang="ts">
	import { Modal } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';
  export let action = '';
  export let price = 0;
  export let open = false;
  let amount = '';
  const dispatch = createEventDispatcher();

  function confirmOrder() {
    dispatch('confirm', { action, amount });
    amount = '';
  }

  function keyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      confirmOrder();
    }
  }
</script>

<Modal title="Order" bind:open={open} autoclose>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <h3 class="text-lg font-semibold">{action} Order</h3>
      <p class="py-4">Price: ${price}</p>
      <input type="number" on:keydown={keyDown} bind:value={amount} class="w-full px-3 py-2 border rounded" placeholder="Amount" />
      <button on:click={confirmOrder} class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Confirm</button>
    </div>
  </div>
</Modal>
