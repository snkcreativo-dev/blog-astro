# Notas de Taller

Blog didactico construido con Astro y preparado para:

- publicar contenido en Markdown con Astro Content Collections
- editar entradas con Decap CMS
- desplegar automaticamente en GitHub Pages
- mantener una base clara para aprender y crecer sin sobre-ingenieria

## Que incluye esta base

- Blog con portada, listado, pagina individual y pagina fija "Sobre este blog"
- Colecciones tipadas con validacion de contenido
- SEO basico, sitemap, RSS y `robots.txt`
- GitHub Actions para despliegue
- Decap CMS con:
  - modo local funcional mediante `decap-server`
  - backend GitHub preparado para produccion
  - explicacion del paso OAuth necesario para escribir en GitHub desde `/admin`

## Estructura pensada para aprender

```text
/
├─ .github/workflows/
├─ public/
│  ├─ admin/
│  └─ uploads/
├─ src/
│  ├─ components/
│  ├─ config/
│  ├─ content/
│  │  ├─ blog/
│  │  └─ pages/
│  ├─ layouts/
│  ├─ pages/
│  ├─ styles/
│  └─ utils/
├─ astro.config.mjs
└─ package.json
```

## Comandos importantes

```bash
npm install
npm run dev
npm run dev:cms
npm run dev:full
npm run check
npm run build
```

### Cuando usar cada uno

- `npm run dev`: levanta solo Astro
- `npm run dev:cms`: levanta el proxy local de Decap en `http://localhost:8081`
- `npm run dev:full`: arranca Astro y Decap a la vez
- `npm run check`: valida tipos y colecciones
- `npm run build`: genera la version lista para produccion

## Flujo recomendado de trabajo

### 1. Desarrollo del sitio

```bash
npm run dev
```

### 2. Edicion local con Decap CMS

```bash
npm run dev:full
```

Despues abre:

- sitio: `http://localhost:4321`
- panel CMS: `http://localhost:4321/admin/`

## Como funciona el contenido

### Blog

Los posts viven en:

```text
src/content/blog/
```

Cada archivo Markdown pertenece a la coleccion `blog` y debe respetar el esquema definido en:

```text
src/content.config.ts
```

Esto es importante porque Astro valida el frontmatter y evita muchos errores comunes antes de desplegar.

### Paginas fijas

Las paginas editables pero no listables viven en:

```text
src/content/pages/
```

En esta base ya se incluye `sobre-este-blog.md`.

## Decap CMS: lo importante de verdad

### Modo local

Esta base ya queda lista para editar contenido en local con `decap-server`.

### Produccion en GitHub Pages

Aqui hay un matiz importante:

- Decap CMS necesita autenticacion OAuth para escribir en GitHub
- GitHub Pages por si sola no proporciona ese servidor de autenticacion

Por eso el panel `/admin` queda preparado, pero para que edite en produccion necesitas uno de estos caminos:

1. Montar un proxy OAuth para GitHub
2. Mover el despliegue a Netlify y usar Git Gateway

### Si quieres mantener GitHub Pages

La opcion mas directa es usar un proxy OAuth externo y configurar estos valores en `public/admin/index.html`:

- `window.DECAP_REPO`
- `window.DECAP_AUTH_BASE_URL`
- `window.DECAP_AUTH_ENDPOINT`

La logica del panel ya esta preparada para aceptar esos valores.

## Despliegue en GitHub Pages

El workflow esta en:

```text
.github/workflows/deploy.yml
```

### Flujo esperado

1. Subes el proyecto a GitHub
2. Renombras la rama principal a `main` si aun no lo has hecho
3. En GitHub activas Pages con fuente `GitHub Actions`
4. Haces push a `main`

### Variables opcionales

Si usas dominio personalizado o necesitas forzar rutas, puedes definir variables en GitHub:

- `SITE_URL`
- `BASE_PATH`

Si no las defines, el workflow intenta inferirlas automaticamente desde el nombre del repositorio.

## Siguientes mejoras naturales

- integrar Tailwind si quieres un sistema de utilidades
- anadir paginacion
- anadir busqueda
- anadir imagen Open Graph automatica
- conectar un proveedor real de autenticacion para Decap en produccion
