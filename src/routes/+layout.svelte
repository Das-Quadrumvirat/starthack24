<script>
  import { BottomNav, BottomNavItem, Tooltip } from 'flowbite-svelte';
  import { HomeSolid, WalletSolid, FaceExplodeOutline, UserCircleSolid, GlobeOutline } from 'flowbite-svelte-icons';
	import '../app.pcss';
</script>

<style>
  main {
    height: calc(100vh - 8rem);
  }
</style>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/favicon.png" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EcoVest</span>
        </a>
        <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <span class="text-sm  text-gray-500 dark:text-white"></span>
        </div>
    </div>
</nav>

<BottomNav position="absolute" navType="border" classInner="grid-cols-5">
  <BottomNavItem href="/home" btnName="Home" appBtnPosition="middle">
    <HomeSolid class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    <Tooltip arrow={false}>Home</Tooltip>
  </BottomNavItem>
  <BottomNavItem href="/portfolio" btnName="Portfolio" appBtnPosition="middle">
    <WalletSolid class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    <Tooltip arrow={false}>Portfolio</Tooltip>
  </BottomNavItem>
  <div class="flex items-center justify-center">
    <BottomNavItem href="/assistant" btnName="" appBtnPosition="middle" btnClass="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary-600 rounded-full hover:bg-primary-700 group focus:ring-4 focus:ring-primary-300 focus:outline-none dark:focus:ring-primary-800">
      <FaceExplodeOutline class="text-white" />
      <Tooltip arrow={false}>Assistant</Tooltip>
    </BottomNavItem>
  </div>
  <BottomNavItem href="/discover" btnName="Discover" appBtnPosition="middle">
    <GlobeOutline class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    <Tooltip arrow={false}>Discover</Tooltip>
  </BottomNavItem>
  <BottomNavItem href="/profile" btnName="Profile" appBtnPosition="middle">
    <UserCircleSolid class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    <Tooltip arrow={false}>Profile</Tooltip>
  </BottomNavItem>
</BottomNav>

<main class="p-6 pb-2">
  <slot />
</main>
