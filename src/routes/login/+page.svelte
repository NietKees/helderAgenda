<script lang="ts">
	import type { PageProps } from './$types';
	import type { User } from '$lib/types.ts';

	let { data, form }: PageProps = $props();
	let currentUser: User | undefined = $state(data.user);
</script>
<div class="h-full w-full flex flex-col flex-row-[auto_1fr]">
	<div class="flex h-full justify-center pt-12">
		<div class="flex py-10 justify-center w-full h-fit gap-40">
			<div class="flex flex-col gap-10 items-center">
				<h1 class="text-4xl ">Log in</h1>
				<form method="POST" action="?/login" class="flex flex-col gap-4">
					{#if form?.success}
						<!-- this message is ephemeral; it exists because the page was rendered in
									 response to a form submission. it will vanish if the user reloads -->
						<p>Successfully logged in! Welcome back</p>
					{:else if form}
						<p>failed to log in!</p>
					{/if}
					{#if form?.missing}<p class="error">The email field is required</p>{/if}
					<!--{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}-->
					<label class="flex flex-col items-center">
						Email
						<input name="email" type="email" class="rounded-md border-accent focus:border-transparent focus:ring-accent-foreground"/>
					</label>
					<label class="flex flex-col items-center">
						Password
						<input name="password" type="password" class="rounded-md border-accent focus:border-transparent focus:ring-accent-foreground"/>
					</label>
					<div class="flex justify-center">
						<button class="bg-accent rounded-md text-white px-2 py-1 hover:cursor-pointer" onclick={() => currentUser = undefined}>Log in</button>
					</div>
				</form>
				<a href="../signup" class="underline text-accent italic ">sign up</a>
			</div>
		</div>
	</div>
</div>
