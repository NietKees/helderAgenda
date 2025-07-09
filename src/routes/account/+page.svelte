<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="w-full h-full flex justify-center">
	<div class="h-fit w-fit p-6 rounded-xl shadow-lg border bg-white text-center space-y-6">
		<h1 class="text-2xl font-semibold">👤 Account Overview</h1>

		<p class="text-lg">Welcome, <span class="font-medium text-accent">{data.user.email}</span></p>

		<div class="flex flex-col gap-4 items-center">
			<a href="/{data.user.id}" class="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition">
				View My Agenda
			</a>

			<form method="POST" action="?/logout" >
				<button
					type="submit"
					name="logout"
					class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition hover:cursor-pointer"
				>
					Log Out
				</button>
			</form>
		</div>
	</div>
</div>
