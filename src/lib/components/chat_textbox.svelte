<script lang="ts">
  import { Textarea, Alert, ToolbarButton } from 'flowbite-svelte';
  import { PaperPlaneOutline } from 'flowbite-svelte-icons';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let content = '';

  function submitMessage() {
    if (content.length === 0) return;
    dispatch('message', { content });
    content = '';
  }

  function handleKey(e: KeyboardEvent) { 
    if (e.key === 'Enter') {
      submitMessage();
      e.preventDefault();
    }
  }
</script>

<form>
  <label for="chat" class="sr-only">Your message</label>
  <Alert color="dark" class="px-3 py-2">
    <svelte:fragment slot="icon">
      <Textarea id="chat" class="mx-4" rows="1" placeholder="Your message..." bind:value={content} on:keydown={handleKey}/>
      <ToolbarButton type="submit" color="blue" class="rounded-full text-primary-600 dark:text-primary-500" on:click={submitMessage}>
        <PaperPlaneOutline class="w-5 h-5 rotate-45" />
        <span class="sr-only">Send message</span>
      </ToolbarButton>
    </svelte:fragment>
  </Alert>
</form>
