<script lang="ts">
  import '../app.css';
  import Loading from '$components/Loading.svelte';

  import { onMount } from 'svelte';
  import app from '$stores/app';

  let ready = false;

  window.addEventListener('mouseup', (mouseEvent) => {
    if (![2].includes(mouseEvent.button)) {
      mouseEvent.preventDefault();
      mouseEvent.stopPropagation();
    }
  });

  window.addEventListener('auxclick', (mouseEvent) => {
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
  });

  window.electron.receive('electron', ({ event, data }) => {
    switch (event) {
      case 'ready': {
        $app = { ...$app, ...data.versions };
        ready = true;
        break;
      }
    }
  });

  onMount(() => window.electron.send('electron', { event: 'ready' }));
</script>

{#if ready}
  <slot />
{:else}
  <div class="absolute flex justify-center items-center h-full w-full">
    <Loading />
  </div>
{/if}
