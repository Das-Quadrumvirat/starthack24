<script lang="ts">
  import { Heading, P, Button } from 'flowbite-svelte';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import type { Message } from 'ai/svelte';
	import { UserDescription } from '$lib/types';
	import Chat from '$lib/components/chat.svelte';

  import { onMount } from 'svelte';
  import { browser } from '$app/environment'

  onMount(() => {
    if (browser && localStorage['user_description']) window.location.assign("/app/home")
  })

	let chatting = true;

	const systemPrompt = `You are a personal investment consultand named Lina. You're purpose is to help unexperienced people make sensible investment decisions. The users you are interacting with are primarily young adults earning their first money and wanting to invest it. Recommend primarily funds. Use easy language and avoid the pig latin. If your task is to pick a stock or fund use the function call to actually show that.
You are responsible for the onboarding. Engage with the user and get to know him or her.
Don't start with the financial questions. Be friendly and try to get to know the user as a person. Start with the name and age.
Make the Q&A as natural as possible. Don't start with all questions at once. Instead ask them one by one and engage with the users answers.
Ask about their goals and risk tolerance.
Ask them what they care about. Ask them about their line of work and what they might actually already have expertise in.
Ask them what is important for them. The categories are:
- Compliance
- Sustainability
- Environmental
- Social
Take notes on the user at the very end. End the conversation with taking the notes and then giving two sentences relating to the content of the conversation and that you hope the user will enjoy the app. You should exchange under 15 messages.`;
	const assistantConversationStarter = 'Please tell me about yourself :)';

	function handleMessage(message: Message) {
		console.log(message);
		if (message.role === 'assistant' && message.function_call!.name === 'user_description') {
			try {
				const userDescription = UserDescription.parse(JSON.parse(message.function_call.arguments));
				console.log('saving user description', userDescription);
				localStorage.setItem('user_description', JSON.stringify(userDescription));
				chatting = false;
			} catch (error) {
				console.error('Failed to onboard correcly', error);
				// window.location.reload();
			}
		}
	}

	function resetPreferences() {
		chatting = true;
		localStorage.removeItem('user_description');
	}

	onMount(() => {
		const userDescriptionStr = localStorage.getItem('user_description');
		if (!userDescriptionStr) return;
		try {
			UserDescription.parse(userDescriptionStr);
			chatting = false;
		} catch {
			console.error('Failed to deserde');
		}
	});
</script>

{#if chatting}
	<Chat
		bottomPadding={0}
		{systemPrompt}
		{assistantConversationStarter}
		onFinish={handleMessage}
		api={'/api/onboarding'}
	/>
{:else}
  <img src="/favicon.png" class="h-32 mx-auto mb-4" alt="EcoVest Logo" />
  <Heading tag="h1" class="mb-4 text-center" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">You are ready to go!</Heading>
  <P class="p-4 mb-6 text-center text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">I think we are done here, let's get started with investing!!</P>
  <div class="flex justify-center">
    <Button href="/app/home">
      Go
      <ArrowRightOutline class="w-3.5 h-3.5 ms-2" />
    </Button>
  </div>
{/if}
