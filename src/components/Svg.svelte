<script lang="ts">
	import { svgs } from '$libs/functions/__svg';
	import type { SvgSrc, SvgSrcFolder } from '$types/Svgs';

	let className: string = '';

	export let iconClass: string = '';
	export let src: SvgSrc | `${SvgSrcFolder}/${string}`;
	export let style: string = '';
	export { className as class };

	const getSvg = async (filepath: string) => {
		return svgs[filepath].default;
	};

	// After you import this component
	// you have to specify the 'src' of the svg
	// Example: <Svg src="symbols/menu" />
	// The src is the file path that you defined in '$libs/functions/__svg',
	// meaning 'symbols' is the folder and 'menu' being the svg file name
	// no '.svg' needed
</script>

<div class="flex justify-center items-center {className}">
	{#await getSvg(src) then Svg}
		<svelte:component
			this="{Svg}"
			class="fill-white w-full h-full {iconClass}"
			style="{style}"
		/>
	{/await}
</div>
