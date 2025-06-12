<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>
<div class=" flex justify-center pt-12">

	<div class="flex flex-col py-10 items-center justify-between">
		<div class="flex flex-col gap-10 items-center">
			<h1 class="text-4xl ">Sign up</h1>
			<form method="POST" action="?/signup" class="flex flex-col gap-4">
				<label class="flex flex-col items-center">
					Email
					<input name="email" type="email" class="rounded-md border-accent focus:border-transparent focus:ring-accent-foreground"/>
				</label>
				<label class="flex flex-col items-center">
					Password
					<input name="password" type="password" class="rounded-md border-accent focus:border-transparent focus:ring-accent-foreground"/>
				</label>
				<div class="flex justify-center">
					<button class="bg-accent rounded-md text-white px-2 py-1 hover:cursor-pointer">Log in</button>
				</div>
			</form>
		</div>
		{#if form?.success}
			<!-- this message is ephemeral; it exists because the page was rendered in
						 response to a form submission. it will vanish if the user reloads -->
			<p>Successfully logged in! Welcome back</p>
		{/if}

		<a href="../" class="underline text-accent italic ">log in</a>
	</div>

</div>