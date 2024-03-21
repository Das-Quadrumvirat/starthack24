<script lang="ts">
  import { browser } from '$app/environment';
	import ChatMessageBubble from '$lib/components/chat_message.svelte';
	import ChatTextbox from '$lib/components/chat_textbox.svelte';
	import { useChat } from 'ai/svelte';

  export let bottomPadding: number;

	const { input, handleSubmit, messages } = useChat({
    api: '/app/assistant',
		initialMessages: [
			{
				id: '1',
				role: 'assistant',
				content: 'Hi!'
			},
			{
				id: '2',
				role: 'assistant',
				content: 'How can I help you today?'
			}
		]
	});

  $: $messages, scrollToBottom();

  function scrollToBottom() {
    if (browser) { 
      setTimeout(() => window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' }), 0);
    }
  }

</script>

<div class={"flex flex-col pb-" + (bottomPadding + 16)}>
	<div class="flex-1 overflow-auto">
		{#each $messages as message}
			<ChatMessageBubble {message} />
		{/each}
	</div>
</div>

<div class={"fixed start-0 w-full border-t border-t-gray-300 bottom-" + bottomPadding}>
  <ChatTextbox {handleSubmit} input={input} />
</div>
