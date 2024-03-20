<script lang="ts">
  import ChatMessageBubble from '$lib/components/chat_message.svelte';
	import ChatTextbox from '$lib/components/chat_textbox.svelte';
  import { createEventDispatcher } from 'svelte';

  let chat: HTMLDivElement;

  let messages: ChatMessage[] = [];

  let dispatch = createEventDispatcher();

  /**
   * Add a message to the chat
   * @param message The ChatMessage object to add
   */
  export function addMessage(message: ChatMessage) {
    messages = [...messages, message];
  }

  /**
   * Add a bot message to the chat
   * (type = bot; side = left)
   * @param content The text of the message
   */
  export function addBotMessage(content: string) {
    addMessage({ kind: 'bot', side: 'left', content });
  }

  /**
   * Add a user message to the chat
   * (type = user; side = right)
   * @param content The text of the message
   */
  export function addUserMessage(content: string) {
    addMessage({ kind: 'user', side: 'right', content });
  }

  function handleMessage(e: CustomEvent<{ content: string }>) {
    let { content } = e.detail;

    addUserMessage(content);
    setTimeout(() => chat.scroll({ top: chat.scrollHeight, behavior: 'smooth' }), 0);
    dispatch('message', { content });
  }
</script>


<div class="flex flex-col h-full">
  <div bind:this={chat} class="flex-1 overflow-auto">
    {#each messages as message (message)}
      <ChatMessageBubble {message} />
    {/each}
  </div>

  <div class="pt-2 border-t border-t-gray-300">
    <ChatTextbox on:message={handleMessage}/>
  </div>
</div>
