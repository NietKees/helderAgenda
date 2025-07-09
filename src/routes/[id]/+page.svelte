<script lang="ts">
	import Calendar from '$lib/Calendar.svelte';
	import type { Agenda } from '$lib/types';

	let { data }: PageProps = $props();
	console.log('after load', data.agenda)
</script>

<div class="w-full h-full">

	<div class="w-full ">
		<Calendar agenda={data.agenda}/>
	</div>

</div>