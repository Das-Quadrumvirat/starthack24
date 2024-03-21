<script lang="ts">
	import ChatMessageBubble from '$lib/components/chat_message.svelte';
	import ChatTextbox from '$lib/components/chat_textbox.svelte';
	import { useChat } from 'ai/svelte';

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

</script>

<div class="flex h-full flex-col">
	<div class="flex-1 overflow-auto">
		{#each $messages as message}
			<ChatMessageBubble {message} />
		{/each}
	</div>

	<div class="border-t border-t-gray-300 pt-2">
		<ChatTextbox {handleSubmit} input={input} />
	</div>
</div>
