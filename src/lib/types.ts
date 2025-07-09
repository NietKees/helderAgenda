export type Agenda = {
	date: string; // 'day-month-year'
	items: AgendaItem[];
}
export type AgendaItem = {
	title: string;
	time: string;
	description?: string;
}
export type User = {
	id: string
	email: string
}