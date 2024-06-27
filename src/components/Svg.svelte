<script lang="ts">
  import * as icons from '@mdi/js';
  import type { Icon } from '$types/Mdi';

  let className: string = '';
  export let icon: Icon;

  export let svgClass: string = '';
  export let svgStyle: string = '';

  export let pathClass: string = '';
  export let pathStyle: string = '';
  export { className as class };
</script>

<div class="flex justify-center items-center {className}">
  <svg
    viewBox="0 0 24 24"
    class="fill-white w-full h-full {svgClass}"
    style="{svgStyle}"
  >
    <path
      class="{pathClass}"
      style="{pathStyle}"
      d="{icons[icon]}"
    ></path>
  </svg>
</div>
