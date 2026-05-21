export function formatDate(date: Date) {
	return new Intl.DateTimeFormat('es-ES', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}).format(date);
}
