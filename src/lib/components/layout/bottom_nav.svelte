<script lang="ts">
  import { BottomNav, BottomNavItem, Tooltip } from 'flowbite-svelte';
  import { HomeSolid, WalletSolid, FaceExplodeOutline, UserCircleSolid, GlobeOutline } from 'flowbite-svelte-icons';
</script>

<BottomNav position="absolute" navType="border" classInner="grid-cols-5">
  <BottomNavItem href="/app/home" btnName="Home" appBtnPosition="middle">
    <HomeSolid class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    <Tooltip arrow={false}>Home</Tooltip>
  </BottomNavItem>
  <BottomNavItem href="/app/portfolio" btnName="Portfolio" appBtnPosition="middle">
    <WalletSolid class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    <Tooltip arrow={false}>Portfolio</Tooltip>
  </BottomNavItem>
  <div class="flex items-center justify-center">
    <BottomNavItem href="/app/assistant" btnName="" appBtnPosition="middle" btnClass="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary-600 rounded-full hover:bg-primary-700 group focus:ring-4 focus:ring-primary-300 focus:outline-none dark:focus:ring-primary-800">
      <FaceExplodeOutline class="text-white" />
      <Tooltip arrow={false}>Assistant</Tooltip>
    </BottomNavItem>
  </div>
  <BottomNavItem href="/app/discover" btnName="Discover" appBtnPosition="middle">
    <GlobeOutline class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    <Tooltip arrow={false}>Discover</Tooltip>
  </BottomNavItem>
  <BottomNavItem href="/app/social" btnName="Social" appBtnPosition="middle">
    <UserCircleSolid class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    <Tooltip arrow={false}>Social</Tooltip>
  </BottomNavItem>
</BottomNav>
