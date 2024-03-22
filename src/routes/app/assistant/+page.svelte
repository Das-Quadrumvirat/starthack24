<script lang="ts">
	import type { Message } from 'ai';
	import Chat from '$lib/components/chat.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { UserDescription } from '$lib/types';
	import { getAllAssetData } from '$lib/asset';
  	import { fallbackUserDescription } from '$lib/util';

	let funds = getAllAssetData().map(({ name, ISIN }) => `${name} (${ISIN})`).join(', ');

	let systemPrompt = `You are a personal investment consultant named Lina. Your purpose is to help unexperienced people make sensible investment decisions. The users you are interacting with are primarily young adults earning their first money and wanting to invest it. Recommend primarily funds. You can only recommend funds from the following list: ${funds}. Use easy language and avoid the pig latin.
If your task is to pick a stock or fund use the function call to actually show that. Every time you mention a stock or fund, use the function call to show it. It is absolutely crucial that you do this.`;
	let chatPromise: Promise<string> = new Promise(() => {});

	onMount(() => {
		if (browser) {
			const userDescription = localStorage.getItem('user_description') || JSON.stringify(fallbackUserDescription)
			if (!userDescription) {
				return;
			}
			try {
				const userDescriptionRich = UserDescription.parse(JSON.parse(userDescription));
				console.log('We found rich user description', userDescriptionRich);
				const additionalInformation = `
During onboarding you have noted about the user (please incorporate this into the conversation):
Name: ${userDescriptionRich.name}
Profession: ${userDescriptionRich.profession}
Age: ${userDescriptionRich.age}
Risk Aversion: ${userDescriptionRich.riskAversion}
Investment Horizon: ${userDescriptionRich.investmentHorizon}
Investment Amount: $${userDescriptionRich.investmentAmount}
Compliance (low to high 0-3): ${userDescriptionRich.compliance}
Compliance Description: ${userDescriptionRich.complianceDescription}
Sustainability (low to high 0-1): ${userDescriptionRich.sustainability}
Sustainability Description: ${userDescriptionRich.sustainabilityDescription}
Environment (low to high 0-1): ${userDescriptionRich.environment}
Environment Description: ${userDescriptionRich.environmentDescription}
Social (low to high 0-1): ${userDescriptionRich.social}
Social Description: ${userDescriptionRich.socialDescription}
likes Products:
- ${userDescriptionRich.likesProducts.join('\n- ')}
Additional Notes: ${userDescriptionRich.additionalNotes}
Previous Investment: ${userDescriptionRich.previousInvestments.join('\n')}
Veryify that you have read this by answering the first question with the name of the user.
`;
				systemPrompt += additionalInformation;
				console.log('systemPrompt', systemPrompt);
			} catch {
				console.error('failed to load');
			} finally {
				chatPromise = Promise.resolve(systemPrompt);
			}
		}
	});

	const assistantConversationStarter = 'how can I help you today?';
</script>

{#await chatPromise}
	<p>Loading...</p>
{:then prompt}
	<Chat bottomPadding={16} systemPrompt={prompt} {assistantConversationStarter} />
{/await}
