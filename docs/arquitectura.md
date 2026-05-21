# Arquitectura del proyecto

## Idea principal

Este proyecto separa claramente cuatro capas:

1. configuracion
2. contenido
3. presentacion
4. despliegue

La idea no es solo "tener archivos ordenados", sino hacer que cada decision tenga un lugar claro.

## 1. Configuracion

Archivos clave:

- `astro.config.mjs`
- `src/config/site.ts`
- `package.json`

Aqui se define:

- la URL publica
- la subruta del proyecto
- scripts de desarrollo y build
- branding textual comun

### Por que esta capa importa

Cuando el proyecto crece, una mala configuracion hace que:

- los enlaces fallen en GitHub Pages
- los metadatos se repitan
- los scripts pierdan coherencia

## 2. Contenido

Archivos clave:

- `src/content.config.ts`
- `src/content/blog/`
- `src/content/pages/`

Aqui vive el contrato editorial real.

### Regla importante

Si cambias el frontmatter de una entrada, debes revisar estas tres piezas:

1. `src/content.config.ts`
2. `public/admin/index.html`
3. la ruta o componente que renderiza ese campo

## 3. Presentacion

Archivos clave:

- `src/layouts/BaseLayout.astro`
- `src/components/`
- `src/styles/global.css`

Esta capa controla:

- layout general
- header y footer
- tarjetas
- jerarquia tipografica
- comportamiento del header al hacer scroll

### Enfoque usado aqui

La presentacion intenta sentirse editorial, no de dashboard ni de landing generica.

Por eso se prioriza:

- masthead fuerte
- ritmo vertical
- reticula
- tarjetas con tono de publicacion

## 4. Despliegue

Archivos clave:

- `.github/workflows/deploy.yml`
- `public/.nojekyll`

El proyecto se construye en GitHub Actions y publica `dist/` en GitHub Pages.

### Importante

El proyecto no se despliega "desde una rama con HTML manual".
Se despliega desde un workflow porque Astro necesita compilar primero.

## Flujo de datos resumido

1. el contenido entra por Markdown o Decap CMS
2. Astro valida ese contenido con Content Collections
3. las utilidades lo preparan para el frontend
4. las rutas Astro generan HTML estatico
5. GitHub Actions publica ese resultado
