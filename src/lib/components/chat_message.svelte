<script lang="ts">
	import type { Message } from 'ai';
	import { FaceExplodeOutline, UserCircleSolid } from 'flowbite-svelte-icons';
	import { micromark } from 'micromark';
	import StockPick from '$lib/components/StockPick.svelte';
  import AssetPreview from '$lib/components/asset.svelte'

	export let message: Message;

	let name = message.role == 'user' ? 'You' : 'Lina';
	let dir = message.role == 'assistant' ? 'ltr' : 'rtl';
</script>

<div class="mb-4 flex items-start gap-2.5" {dir}>
	{#if message.role === 'user'}
		<UserCircleSolid class="mb-1 h-5 w-5" />
	{:else if message.role === 'assistant'}
		<FaceExplodeOutline class="mb-1 h-5 w-5" />
	{/if}
	<div
		class="leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700"
		dir="ltr"
	>
		{#if message.role !== 'function'}
			<div class="flex items-center space-x-2 rtl:space-x-reverse">
				<span class="text-sm font-semibold text-gray-900">{name}</span>
			</div>
		{/if}
		{#if message.role === 'user'}
			<div class="markdown-container text-right" dir="ltr">
				{@html micromark(message.content)}
			</div>
		{:else if message.role === 'function' && message.name === 'asset_pick'}	
			<AssetPreview isin={JSON.parse(message.content).isin} border={false} transparent={true}></AssetPreview>
		{:else if message.role === 'assistant'}
			<div class="markdown-container text-left" dir="ltr">
				{@html micromark(message.content)}
			</div>
		{/if}
	</div>
</div>

<style>
	.markdown-container :global(p) {
		padding-top: 0.625rem;
		padding-bottom: 0.625rem;
		font-size: 0.875rem;
		font-weight: 400;
		color: #374151;
		word-wrap: break-word;
	}
	/* @media (prefers-color-scheme: dark) {
		.markdown-container :global(p) {
			color: black;
		}
	} */
</style>
