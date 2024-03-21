<script lang="ts">
  import { FaceExplodeOutline, UserCircleSolid } from 'flowbite-svelte-icons';
  export let message: ChatMessage;

  let name = message.kind == 'user' ? 'You' : 'Lina';
  let dir = message.side == 'left' ? 'ltr' : 'rtl';
</script>

<div class="flex items-start gap-2.5 mb-4" dir={dir}>
  {#if message.kind === 'user'}
    <UserCircleSolid class="w-5 h-5 mb-1" />
  {:else}
    <FaceExplodeOutline class="w-5 h-5 mb-1" />
  {/if}
   <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
         <span class="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
      </div>
      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white text-{message.side}" dir="ltr">{message.content}</p>
   </div>
</div>

