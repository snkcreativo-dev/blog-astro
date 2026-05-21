# Como extender este proyecto sin romperlo

## Objetivo de esta guia

Esta base no solo quiere funcionar. Tambien quiere dejar claro como crecer con seguridad.

La idea es que cuando anadas una pieza nueva, sepas exactamente que archivos tocar y por que.

## Caso 1: anadir un nuevo campo al blog

Ejemplo:

quieres anadir `series` al frontmatter de las entradas.

### Pasos

1. Edita `src/content.config.ts`
2. Anade el campo al schema de `blog`
3. Edita `public/admin/index.html`
4. Anade el campo en la coleccion `blog` de Decap
5. Decide donde se renderiza:
   - `src/components/PostCard.astro`
   - `src/pages/blog/[slug].astro`
   - portada o archivo si aplica
6. Ejecuta `npm run check`

### Por que ese orden

Porque el schema es el contrato principal.

Si primero cambias el frontend y luego el schema, acabas con errores o tipos incoherentes.

## Caso 2: crear una pagina fija nueva

Ejemplo:

quieres una pagina `manifesto`.

### Opcion recomendada en esta base

1. Crea `src/content/pages/manifesto.md`
2. Si quieres editarla con Decap, anadela en `public/admin/index.html`
3. Crea `src/pages/manifesto.astro`
4. Usa `getEntry('pages', 'manifesto')`
5. Reutiliza `BaseLayout.astro`

### Ventaja

Mantienes el mismo patron que ya usa `sobre-este-blog`.

## Caso 3: crear una nueva coleccion

Ejemplo:

quieres `notes`, `podcasts` o `reviews`.

### Pasos

1. Define la coleccion en `src/content.config.ts`
2. Crea la carpeta en `src/content/`
3. Anade contenido de ejemplo
4. Si hace falta, configura Decap para esa nueva coleccion
5. Crea las rutas que la consuman

### Lo importante

No empieces por el diseno.
Empieza por el modelo de contenido.

## Caso 4: cambiar el estilo del sitio

### Orden sano

1. revisa `src/styles/global.css`
2. revisa que componentes usan esas clases
3. cambia primero tokens y ritmo visual
4. luego ajusta componentes concretos

### Error comun

Cambiar veinte componentes sin tocar los tokens base.

Eso suele generar un diseno incoherente y dificil de mantener.

## Caso 5: tocar el despliegue

Archivos implicados:

- `astro.config.mjs`
- `.github/workflows/deploy.yml`
- `src/utils/links.ts`

### Regla clave

Si cambia la URL publica o la subruta, revisa siempre:

1. `SITE_URL`
2. `BASE_PATH`
3. `withBase()`

## Checklist antes de hacer push

```bash
npm run check
npm run build
```

Si una extension toca contenido, CMS o rutas, no te saltes estos dos pasos.
