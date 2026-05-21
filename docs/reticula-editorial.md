# Reticula editorial 12 / 8 / 4

## Que problema resuelve esta guia

Cuando un tema "se ve raro" casi nunca es por una fuente o un color aislado. Normalmente el problema real es este:

- cada bloque usa un ancho distinto
- los botones se colocan con margenes manuales
- las cajas no comparten ritmo
- en tablet y mobile no existe una reticula clara

En este proyecto se corrigio eso creando una reticula unica:

- `12` columnas en desktop
- `8` columnas en tablet
- `4` columnas en mobile

La idea importante es sencilla: primero decides la estructura, luego estilizas las piezas.

## Donde vive la reticula

La base esta en [global.css](</C:/snoker/astro-didactico/src/styles/global.css>).

Las variables clave son:

- `--grid-columns-current`
- `--grid-gap`
- `--section-gap`

Y los bloques que la usan de forma directa son:

- `.hero`
- `.feature-card`
- `.editorial-grid`
- `.post-grid`
- `.section-heading`

## Como esta montada

### 1. Desktop: 12 columnas

En desktop cada bloque importante usa:

```css
grid-template-columns: repeat(12, minmax(0, 1fr));
```

Eso no significa que todo tenga que ocupar 12 columnas completas. Significa que cada modulo reparte el espacio con la misma regla base.

Ejemplos del proyecto:

- hero principal: `8` columnas
- columna lateral de la hero: `4` columnas
- articulo destacado: `7 / 5`
- bloque editorial inferior: `5 / 4 / 3`
- tarjetas del archivo: `4 + 4 + 4`

## 2. Tablet: 8 columnas

En `@media (max-width: 1024px)` la reticula baja a `8` columnas.

Aqui no conviene copiar exactamente el reparto de desktop. Lo correcto es reinterpretarlo:

- hero: `5 / 3`
- destacado: `5 / 3`
- bloque editorial: `5 / 3`, y la nota lateral pasa a `4`
- tarjetas del archivo: `4 + 4`

Esto mantiene jerarquia sin apretar demasiado los textos.

## 3. Mobile: 4 columnas

En `@media (max-width: 720px)` todo cae a `4` columnas.

La regla practica es:

- casi todos los modulos importantes ocupan `1 / -1`
- las acciones pasan a una sola columna
- los botones ocupan todo el ancho disponible

Aqui el objetivo no es "miniaturizar" desktop, sino simplificar la lectura.

## Como recolocar una caja sin romper el sistema

Piensa siempre en dos pasos:

1. que bloque padre define la reticula
2. cuantas columnas debe ocupar el hijo en cada breakpoint

Ejemplo real:

```css
.editorial-grid {
	display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr));
}

.editorial-grid__lead {
	grid-column: span 5;
}

.editorial-grid__column {
	grid-column: span 4;
}

.editorial-brief {
	grid-column: span 3;
}
```

Si quieres que la nota lateral pese mas, no toques `padding`, `margin-left` o `width`. Cambia el reparto:

```css
.editorial-grid__column {
	grid-column: span 3;
}

.editorial-brief {
	grid-column: span 4;
}
```

Eso es trabajar con sistema. Lo otro es parchear.

## Como colocar bien botones y acciones

Los botones estaban mal porque el layout dependia de `flex` y del contenido interno. Eso suele provocar:

- alturas incoherentes
- huecos raros
- botones "flotando" sin alineacion clara

Aqui se resolvio asi:

```css
.actions {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, max-content));
	gap: 0.85rem;
	justify-content: start;
}
```

Y en mobile:

```css
.actions {
	grid-template-columns: 1fr;
}

.button,
.button--secondary {
	width: 100%;
}
```

### Regla practica

- si el grupo de acciones tiene dos pesos similares, usa grid
- si en mobile deben apilarse, define ese cambio de forma explicita
- no resuelvas la alineacion con margenes sueltos

## Como saber si una caja esta mal colocada

Hazte estas preguntas:

1. Esta ocupando columnas claras o solo "parece que cabe"
2. Tiene el mismo `gap` que el resto del sistema
3. Se alinea con titulos, botones y bordes vecinos
4. En tablet sigue teniendo sentido o ya parece comprimida
5. En mobile respira o se convierte en un bloque torpe

Si fallas en dos o tres de esas preguntas, el problema suele ser estructural, no estetico.

## Flujo recomendado para ajustarlo tu mismo

### Paso 1

Abre [global.css](</C:/snoker/astro-didactico/src/styles/global.css>) y localiza el bloque padre:

- `hero`
- `feature-card`
- `editorial-grid`
- `post-grid`
- `section-heading`

### Paso 2

Mira que clases hijas definen `grid-column`.

Ejemplos:

- `.hero__panel--lead`
- `.hero__aside`
- `.editorial-grid__lead`
- `.editorial-grid__column`
- `.editorial-brief`

### Paso 3

Cambia solo el reparto de columnas. No toques primero:

- `margin-left`
- `position`
- `width`
- `transform`

### Paso 4

Revisa desktop, tablet y mobile en ese orden.

### Paso 5

Solo despues afina:

- `padding`
- `gap`
- tamaño de titular
- longitud del texto

## Error comun que quiero que evites

Cuando algo se ve descompensado, mucha gente intenta arreglarlo asi:

- subiendo el `padding`
- bajando el `font-size`
- moviendo el boton con `margin-top`
- metiendo un `width: 80%`

Eso maquilla el problema, pero no lo resuelve.

La pregunta correcta no es "como muevo esta caja", sino:

`que lugar ocupa esta pieza dentro de la reticula?`

## Resumen corto

Si quieres mantener este tema con criterio editorial:

- define siempre primero la reticula
- reparte columnas con intencion
- reutiliza los mismos gaps
- apila de forma explicita en mobile
- evita ajustes aislados para corregir problemas estructurales

Esa es la diferencia entre un layout bonito por casualidad y un sistema visual mantenible.
