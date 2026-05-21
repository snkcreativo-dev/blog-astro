/**
 * BLOQUE: Formato de fecha legible
 * - Convierte objetos `Date` en una salida editorial apta para lectores reales.
 * - Mantener esto en una utilidad evita repetir `Intl.DateTimeFormat` por todo el proyecto.
 */
export function formatDate(date: Date) {
	return new Intl.DateTimeFormat('es-ES', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}).format(date);
}
