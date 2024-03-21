<script lang="ts">
	import { Textarea, Alert, ToolbarButton } from 'flowbite-svelte';
	import { PaperPlaneOutline } from 'flowbite-svelte-icons';
	import type { Writeable } from 'svelte/store';

	export let handleSubmit;
	export let input: Writeable<string>;

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleSubmit(e);
		}
	}
</script>

<form on:submit={handleSubmit}>
	<label for="chat" class="sr-only">Your message</label>
	<Alert color="dark" class="px-3 py-2">
		<svelte:fragment slot="icon">
			<Textarea
				id="chat"
				class="mx-4"
				rows="1"
				placeholder="Your message..."
				bind:value={$input}
				on:keydown={handleKey}
			/>
			<input type="submit" hidden />
			<ToolbarButton
				type="submit"
				color="blue"
				class="rounded-full text-primary-600 dark:text-primary-500"
			>
				<PaperPlaneOutline class="h-5 w-5 rotate-45" />
				<span class="sr-only">Send message</span>
			</ToolbarButton>
		</svelte:fragment>
	</Alert>
</form>
