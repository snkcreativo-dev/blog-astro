# Patrones editoriales del sistema visual

## Objetivo

Esta guia explica como ampliar el diseño sin diluir el tono editorial del proyecto.

No intenta definir una "design system" corporativa enorme.
Intenta dejar claro que decisiones visuales sostienen el caracter actual del blog.

## 1. Principios visuales

### Jerarquia fuerte

El proyecto se apoya en:

- titulares con mucho peso
- bloques secundarios mas silenciosos
- texto corrido comodo de leer

Si todo tiene el mismo peso, el tono editorial desaparece.

### Geometria sobria

La interfaz evita pills y formas demasiado blandas.

Se prioriza:

- rectangulos
- bordes limpios
- contenedores con aire

### Contraste entre roles

No todos los bloques deben llamar igual la atencion.

Ejemplo:

- `button`: accion principal con relleno
- `button--secondary`: accion secundaria con contorno
- `eyebrow`: etiqueta editorial breve

## 2. Tokens que conviene tocar primero

Antes de cambiar componentes sueltos, revisa `src/styles/global.css`.

Tokens clave:

- `--brand`
- `--brand-deep`
- `--ink`
- `--ink-soft`
- `--line`
- `--shadow`
- `--radius-*`

## 3. Patrones existentes

### Masthead

Archivo:

- `src/components/SiteHeader.astro`

Funcion:

- presentar branding
- ofrecer navegacion
- fijar tono editorial desde la primera pantalla

Cuando ampliar:

- si añades una nueva seccion importante del sitio
- si cambias claim o posicionamiento

### Tarjeta de articulo

Archivo:

- `src/components/PostCard.astro`

Funcion:

- reutilizar una misma pieza visual en portada, archivo y relacionados

Regla:

- si necesitas otra variante, intenta extender esta logica antes de crear una tarjeta totalmente distinta

### Hero de portada

Archivo:

- `src/pages/index.astro`

Funcion:

- establecer la edicion principal
- dar jerarquia a la historia destacada
- combinar contexto, accion y tono

### Bloques de contexto

Ejemplos:

- `issue-panel`
- `note-panel`
- `editorial-brief`

Funcion:

- añadir capa editorial sin competir con el articulo principal

## 4. Como crear un nuevo bloque sin romper el tono

### Metodo recomendado

1. decide el rol del bloque
2. decide si es principal, secundario o auxiliar
3. reutiliza clases y tokens existentes si puedes
4. solo despues crea una variante nueva

### Preguntas utiles

- este bloque informa, guia o vende?
- necesita relleno o solo contorno?
- compite con un titular o lo acompana?
- deberia vivir en `components/` o ser una estructura local de una pagina?

## 5. Anti-patrones a evitar

- volver a botones tipo pill
- meter colores nuevos sin pasar por tokens
- dar sombra fuerte a todo
- usar demasiadas tipografias
- hacer que portada y archivo parezcan productos distintos

## 6. Regla practica para cambios visuales

Si una decision visual no mejora:

- legibilidad
- jerarquia
- ritmo
- consistencia editorial

entonces probablemente no merece entrar.
