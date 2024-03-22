<script>
  import { Heading, P, Button } from 'flowbite-svelte';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';

  import { onMount } from 'svelte';
  import { browser } from '$app/environment'

  onMount(() => {
    if (browser && localStorage['user_description']) window.location.assign("/app/home")
  })
</script>

<div class="text-center">
  <img src="/favicon.png" class="h-32 mx-auto mb-4" alt="EcoVest Logo" />
  <Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">Grow your wealth, sustain your world!</Heading>
  <P class="p-4 mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Welcome to EcoVest - where investing meets sustainability. Empower your finances and the planet with easy, green investment solutions. Join the movement towards a greener tomorrow.</P>
  <Button href="/get-started">
    Get Started
    <ArrowRightOutline class="w-3.5 h-3.5 ms-2" />
  </Button>
</div>
