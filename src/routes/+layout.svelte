<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';

	let { children, data } = $props();
</script>

<div class="grid h-screen w-screen grid-rows-[auto_1fr] gap-4">
	<Header user={data.user}/>

	{@render children()}
</div>
