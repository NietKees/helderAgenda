<script lang="ts">
	let { data } = $props();
	const user = $derived(data.user);
</script>

<div class="h-full w-screen  flex flex-col p-10 justify-center items-center gap-10">
		<div class="text-8xl ">HOMEPAGE</div>
	<div>
		{#if user}
			<a href="/{user.id}" class="text-4xl text-white bg-accent rounded-md shadow px-4 py-2">view agenda</a>
			<a href="/account" class="text-4xl bg-white  rounded-md shadow px-4 py-2">view account</a>
		{:else}
			<a href="/signup" class="text-4xl text-white bg-accent rounded-md shadow px-4 py-2">signup</a>
			<a href="/login" class="text-4xl bg-white rounded-md shadow px-4 py-2">login</a>
		{/if}

	</div>
</div>