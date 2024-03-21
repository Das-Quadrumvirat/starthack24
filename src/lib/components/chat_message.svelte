<script lang="ts">
	import type { Message } from 'ai';
	import { FaceExplodeOutline, UserCircleSolid } from 'flowbite-svelte-icons';

	export let message: Message & {
		side?: 'left' | 'right';
	};

	let name = message.role == 'user' ? 'You' : 'Lina';
	message.side = message.role == 'user' ? 'right' : 'left';
	let dir = message.role == 'assistant' ? 'ltr' : 'rtl';
</script>

<div class="mb-4 flex items-start gap-2.5" {dir}>
	{#if message.role === 'user'}
		<UserCircleSolid class="mb-1 h-5 w-5" />
	{:else}
		<FaceExplodeOutline class="mb-1 h-5 w-5" />
	{/if}
	<div
		class="leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700"
	>
		<div class="flex items-center space-x-2 rtl:space-x-reverse">
			<span class="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
		</div>
		<p
			class="py-2.5 text-sm font-normal text-gray-900 dark:text-white text-{message.side} break-words"
			dir="ltr"
		>
			{message.content}
		</p>
	</div>
</div>
