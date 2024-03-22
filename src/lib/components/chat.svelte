<script lang="ts">
	import { browser } from '$app/environment';
	import ChatMessageBubble from '$lib/components/chat_message.svelte';
	import ChatTextbox from '$lib/components/chat_textbox.svelte';
	import { useChat } from 'ai/svelte';
	import { clientFunctionCallHandler } from '$lib/ai';
	import { nanoid, type Message } from 'ai';
	import ChatLoader from './chat_loader.svelte';

	export let bottomPadding: number;
	export let systemPrompt: string;
	export let assistantConversationStarter: string;
	export let onFinish: (message: Message) => void = () => {};
	export let api: string = '/app/assistant';

	let { input, handleSubmit, messages, isLoading } = useChat({
		api,
		initialMessages: [
			{
				id: nanoid(),
				role: 'system',
				content: systemPrompt
			},
			{
				id: nanoid(),
				role: 'assistant',
				content: 'Hi!'
			},
			{
				id: nanoid(),
				role: 'assistant',
				content: assistantConversationStarter
			}
		],
		experimental_onFunctionCall: clientFunctionCallHandler,
		onFinish
	});

	$: $messages, scrollToBottom();

	function scrollToBottom() {
		if (browser) {
			setTimeout(() => window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' }), 0);
		}
	}
</script>

<div class={`pb-${bottomPadding + 16} flex flex-col`}>
	<div class="flex-1 overflow-auto">
		{#each $messages as message}
			{#if message.role !== 'system' && message.content.length > 0}
				<ChatMessageBubble {message} />
			{/if}
		{/each}
    {#if $isLoading}
      <ChatLoader />
    {/if}
	</div>
</div>

<div class={`bottom-${bottomPadding} fixed start-0 w-full border-t border-t-gray-300`}>
	<ChatTextbox {handleSubmit} {input} />
</div>
