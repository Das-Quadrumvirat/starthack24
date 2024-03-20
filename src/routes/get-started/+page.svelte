<script lang="ts">
  import Chat from '$lib/components/chat.svelte';

  import { onMount } from 'svelte';

  let chat: Chat;

  onMount(() => {
    chat.addBotMessage('Hi!');
    chat.addBotMessage('Here be dragons. I would be doing the onboarding interview with you now.')
  })

</script>

<Chat bind:this={chat} />
