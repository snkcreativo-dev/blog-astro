# Mapa de archivos clave

## Configuracion

- `astro.config.mjs`
  - configura Astro, sitemap, `site` y `base`
- `package.json`
  - scripts y dependencias
- `src/config/site.ts`
  - textos globales, navegacion y branding base

## Contenido

- `src/content.config.ts`
  - schema y colecciones
- `src/content/blog/*.md`
  - entradas del blog
- `src/content/pages/*.md`
  - paginas fijas

## Presentacion

- `src/layouts/BaseLayout.astro`
  - estructura comun del HTML
- `src/components/SiteHeader.astro`
  - cabecera editorial
- `src/components/SiteFooter.astro`
  - pie global
- `src/components/PostCard.astro`
  - tarjeta de entrada
- `src/components/TagList.astro`
  - taxonomia enlazada
- `src/styles/global.css`
  - tono visual del sitio

## Rutas

- `src/pages/index.astro`
  - portada
- `src/pages/blog/index.astro`
  - archivo principal
- `src/pages/blog/[slug].astro`
  - detalle de articulo
- `src/pages/temas/[tag].astro`
  - archivo por etiqueta
- `src/pages/sobre-este-blog.astro`
  - pagina fija
- `src/pages/rss.xml.js`
  - feed RSS
- `src/pages/robots.txt.ts`
  - reglas de rastreo

## Utilidades

- `src/utils/blog.ts`
  - consultas y logica editorial
- `src/utils/format.ts`
  - salida legible de fechas
- `src/utils/links.ts`
  - enlaces compatibles con `BASE_URL`

## CMS

- `public/admin/index.html`
  - configuracion de Decap CMS

## Despliegue

- `.github/workflows/deploy.yml`
  - build y publicacion en GitHub Pages

## Como usar este mapa

Cuando quieras entender una funcionalidad:

1. localiza la ruta publica
2. mira que contenido consume
3. revisa que utilidad prepara los datos
4. comprueba si Decap tambien toca esa zona
