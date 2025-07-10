<script lang="ts">
	import { onMount } from 'svelte';
	import type {Agenda, AgendaItem} from '$lib/types';

	// let agenda: Agenda[] = [];

	let { agenda } : {agenda: Agenda[]} = $props();

	console.log('agenda in calendar', agenda)


	const today = new Date();
	const todayDate = today.getDate();
	const todayMonth = today.getMonth();
	const todayYear = today.getFullYear();

	let year = $state(todayYear);
	let month = $state(todayMonth);

	let monthNames = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	let daysInMonth = 0;
	let blankDays = $state(0);
	let dates: number[] = $state([]);



	let selectedDay: { day: number; month: number; year: number } | null = $state(null);
	let selectedEvents: AgendaItem[] = $state([]);

	function formatDate(day: number, month: number, year: number) {
		return `${day}-${month + 1}-${year}`; // month+1 because JS months are 0-indexed
	}

	function findEvents(day: number, month: number, year: number): AgendaItem[] {
		const dateStr = formatDate(day, month, year);
		const dayAgenda = agenda.find(a => a.date === dateStr);
		return dayAgenda ? dayAgenda.items : [];
	}

	function openDetails(day: number) {
		selectedDay = { day, month, year };
		selectedEvents = findEvents(day, month, year);
	}

	function closeModal() {
		selectedDay = null;
		selectedEvents = [];
	}

	function generateCalendar() {
		const firstDayOfMonth = new Date(year, month, 1);
		daysInMonth = new Date(year, month + 1, 0).getDate();
		let startDay = firstDayOfMonth.getDay(); // 0 = Sunday

		blankDays = (startDay + 6) % 7; // Adjust so Monday = 0

		dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
	}

	onMount(() => {
		generateCalendar();
	});

	function prevMonth() {
		if (month === 0) {
			month = 11;
			year -= 1;
		} else {
			month -= 1;
		}
		generateCalendar();
	}

	function nextMonth() {
		if (month === 11) {
			month = 0;
			year += 1;
		} else {
			month += 1;
		}
		generateCalendar();
	}

</script>

<div class="px-10 grid grid-cols-[auto_1fr]">
	<!-- Calendar -->
	<div class="w-full mx-auto p-4 bg-white shadow rounded-lg">
		<!-- Header -->
		<div class="py-4 text-center mb-4">
			<div class="flex justify-between items-center px-6">
				<button class="text-2xl cursor-pointer" onclick={prevMonth}>&#10094;</button>
				<div>
					<p class="text-xl font-semibold">{monthNames[month]}</p>
					<p class="text-md">{year}</p>
				</div>
				<button class="text-2xl cursor-pointer" onclick={nextMonth}>&#10095;</button>
			</div>
		</div>

		<!-- Weekdays -->
		<ul class="grid grid-cols-7 text-center text-gray-600 font-semibold mb-2">
			<li>Mo</li>
			<li>Tu</li>
			<li>We</li>
			<li>Th</li>
			<li>Fr</li>
			<li>Sa</li>
			<li>Su</li>
		</ul>

		<!-- Calendar Days -->
		<ul class="grid grid-cols-7 text-sm gap-2">
			<!-- Blank days -->
			{#each Array(blankDays) as _, i}
				<li class="order w-28 rounded-lg p-1 h-24 relative cursor-pointer transition bg-neutral-200"></li>
			{/each}

			<!-- Actual days -->
			{#each dates as day (day)}
				<!--{#let dayDate = formatDate(day, month, year)}-->
				<li
					class={`border border-2 shadow w-28 rounded-lg p-1 h-24 relative cursor-pointer transition hover:scale-[1.02] hover:outline-1
		${day === todayDate && month === todayMonth && year === todayYear
			? 'bg-accent/20 '
			: ''}
		${selectedDay && selectedDay.day === day && selectedDay.month === month && selectedDay.year === year
			? 'outline-accent! border-accent! outline-1 border-1'
			: 'outline-black/50 border-black/50'}
		`}
					onclick={() => openDetails(day)}
				>
					<p class="font-bold text-gray-700">{day}</p>

					{#if findEvents(day, month, year).length > 0}
						<!-- Dot indicator -->
						<span class="w-2 h-2 bg-blue-500 rounded-full absolute top-1 right-1"></span>
						{#each findEvents(day, month, year).slice(0, 2) as event (event.title)}
							<p class="text-xs text-blue-600 truncate">{event.time} - {event.title}</p>
						{/each}
					{/if}
				</li>
			{/each}
		</ul>
	</div>

	<!-- Modal for Day Details -->
	{#if selectedDay !== null}
		<div class="w-full px-4">
			<div class="flex justify-between items-center">
				<h2 class="text-lg font-bold mb-2">{monthNames[selectedDay.month]} {selectedDay.day}, {selectedDay.year}</h2>
				<button
					onclick={closeModal}
					class="text-gray-500 hover:text-gray-700 text-xl"
				>
					&times;
				</button>
			</div>
			{#if selectedEvents.length === 0}
				<p class="text-sm text-gray-500">No events for this day.</p>
			{:else}
				<ul class="space-y-2">
					{#each selectedEvents as event}
						<li class="border rounded p-2">
							<p class="font-semibold">{event.time} – {event.title}</p>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>
