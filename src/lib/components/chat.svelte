<script lang="ts">
	import ChatMessageBubble from '$lib/components/chat_message.svelte';
	import ChatTextbox from '$lib/components/chat_textbox.svelte';
	import { useChat } from 'ai/svelte';
	import { clientFunctionCallHandler } from '$lib/ai';
	import { nanoid } from 'ai';
	import esg from '$lib/data/data.json';
	const funds = Object.keys(esg);

	const { input, handleSubmit, messages } = useChat({
		api: '/app/assistant',
		initialMessages: [
			{
				id: nanoid(),
				role: 'system',
				content: `You are a personal investment consultand named Lina. You're purpose is to help unexperienced people make sensible investment decisions. The users you are interacting with are primarily young adults earning their first money and wanting to invest it. Recommend primarily funds. Use easy language and avoid the pig latin.
Sell the following funds: ${funds.join('\n')}`
			},
			{
				id: nanoid(),
				role: 'assistant',
				content: 'Hi!'
			},
			{
				id: nanoid(),
				role: 'assistant',
				content: 'How can I help you today?'
			}
		],
		experimental_onFunctionCall: clientFunctionCallHandler
	});
</script>

<div class="flex h-full flex-col">
	<div class="flex-1 overflow-auto">
		{#each $messages as message}
			{#if message.role !== 'system' && message.content.length > 0}
				<ChatMessageBubble {message} />
			{/if}
		{/each}
	</div>

	<div class="border-t border-t-gray-300 pt-2">
		<ChatTextbox {handleSubmit} {input} />
	</div>
</div>
