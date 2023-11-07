<script lang="ts">
	import '../app.css';
	import Loading from '$components/Loading.svelte';

	import { onMount } from 'svelte';
	import { app } from '$stores/app';

	import { preloadSvgs } from '$libs/functions/__svg';

	let ready = false;

	// Disable middle, forward & backward mouse buttons
	window.addEventListener('mouseup', function (mouseEvent) {
		if ([1, 3, 4].includes(mouseEvent.button)) {
			mouseEvent.preventDefault();
			mouseEvent.stopPropagation();
		}
	});

	// Disable middle mouse click for opening links in new window
	window.addEventListener('auxclick', function (mouseEvent) {
		mouseEvent.preventDefault();
		mouseEvent.stopPropagation();
	});

	// Add listener for 'electron' channel events
	window.electron.receive('electron', function ({ event, data }) {
		switch (event) {
			// Add 'ready' case to show the page after electron finished loading
			case 'ready': {
				ready = true;
				$app = { ...$app, ...data.versions };
				break;
			}
		}
	});

	onMount(async function () {
		// Preload SVG file(s) before the page is shown
		await preloadSvgs();

		// Send event to electron so it knows that the page is loaded
		window.electron.send('electron', {
			event: 'ready',
			data: null,
		});
	});
</script>

{#if ready}
	<slot />
{:else}
	<div class="absolute flex justify-center items-center h-full w-full">
		<Loading />
	</div>
{/if}
