<script>
	export let value = 0; 
	export let name = 'Social score';
</script>

<div class="flex w-full justify-center" style="--percentage:{value * 100}%">
	<div class="flex w-full max-w-sm flex-col">
	<p class="align-left mb-2">
		{name}
	</p>
	<span class="relative mb-6 slider h-4 w-full rounded-full">
		<input class="bg-gray-600 scale-y-[175%] rounded-full w-1.5 ml-[-0.75rem] left_adaptive absolute h-full top-0">
	</span>
	</div>
</div>

<style>
	.slider {
		background: linear-gradient(to right, #ff5000, #ffd000 33.3%, #70ff00 66.7%, #00d050);
	}

	.left_adaptive {
		left: var(--percentage);
	}
</style>
