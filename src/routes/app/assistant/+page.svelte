<script lang="ts">
  import Chat from '$lib/components/chat.svelte';

  import { onMount } from 'svelte';

  let chat: Chat;

  onMount(() => {
    chat.addBotMessage('Hi!');
    chat.addBotMessage('Ask me about your portfolio, about funds, the app, investing tipps, ...')
  })

</script>

<Chat bind:this={chat} />
