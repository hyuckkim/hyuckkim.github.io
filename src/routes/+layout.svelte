<script lang="ts">
  import { onNavigate } from '$app/navigation';
	import favicon from '$lib/assets/favicon.ico';
  import Star from './Star.svelte';
	import './global.css';
  import 'highlight.js/styles/base16/gruvbox-dark-hard.css';

	let { children } = $props();
	
  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

</svelte:head>
<Star />
{@render children()}
