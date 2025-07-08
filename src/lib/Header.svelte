<script>

	let { user } = $props();

</script>

<div class=" text-white h-20 w-full flex justify-between px-10 items-center bg-accent">
	<a href="/">
		Home
	</a>

	<div>
		<h1 class="text-4xl">Helder Agenda</h1>
	</div>

	{#if user}
		<a href="/account" class="hover:underline">Account</a>
	{:else}
		<a href="/login" class="hover:underline">Login</a>
	{/if}

</div>