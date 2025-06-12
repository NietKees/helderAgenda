<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';

	let { children } = $props();
</script>

<div class="grid h-screen w-screen grid-rows-[auto_1fr] gap-4">
	<Header />

	{@render children()}
</div>
