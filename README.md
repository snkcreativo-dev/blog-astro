# Notas de Taller

Publicacion editorial construida con Astro y pensada para aprender mientras se mantiene publicable.

## Objetivo didactico

Esta base intenta ensenar tres cosas al mismo tiempo:

1. como estructurar un blog moderno con Astro
2. como mantener el contenido en Git sin perder ergonomia editorial
3. como desplegar un sitio real en GitHub Pages sin esconder la complejidad importante

## Que incluye

- Portada editorial
- Archivo de articulos
- Paginas fijas editables
- Content Collections tipadas
- RSS, sitemap y `robots.txt`
- GitHub Actions para despliegue
- Decap CMS con modo local listo y backend GitHub preparado

## Estructura del proyecto

```text
/
|-- .github/workflows/
|-- public/
|   |-- admin/
|   `-- uploads/
|-- src/
|   |-- components/
|   |-- config/
|   |-- content/
|   |   |-- blog/
|   |   `-- pages/
|   |-- layouts/
|   |-- pages/
|   |-- styles/
|   `-- utils/
|-- astro.config.mjs
`-- package.json
```

## Como leer el proyecto

Si quieres entenderlo de forma progresiva, este orden suele funcionar bien:

### 1. Configuracion global

- `astro.config.mjs`
- `src/config/site.ts`
- `.github/workflows/deploy.yml`

Aqui se define:

- la URL publica
- la subruta de GitHub Pages
- el branding base
- la forma en la que el sitio se construye y despliega

### 2. Modelo de contenido

- `src/content.config.ts`
- `src/content/blog/`
- `src/content/pages/`

Aqui esta el contrato real entre contenido, frontend y CMS.

Si cambias un campo del frontmatter, normalmente tendras que revisar:

1. el esquema en `src/content.config.ts`
2. el panel de Decap en `public/admin/index.html`
3. el componente o pagina que lo renderiza

### 3. Logica reutilizable

- `src/utils/blog.ts`
- `src/utils/format.ts`
- `src/utils/links.ts`

Estas utilidades hacen que las paginas Astro no acumulen logica repetida.

### 4. Presentacion

- `src/layouts/BaseLayout.astro`
- `src/components/`
- `src/styles/global.css`

Aqui vive el tono editorial del proyecto: layout, cabecera, tarjetas, jerarquia visual y comportamiento del header.

### 5. Rutas publicas

- `src/pages/index.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/pages/temas/[tag].astro`
- `src/pages/sobre-este-blog.astro`

Estas rutas convierten contenido tipado en paginas estaticas reales.

## Comandos importantes

```bash
npm install
npm run dev
npm run dev:cms
npm run dev:full
npm run check
npm run build
```

## Cuando usar cada comando

- `npm run dev`: arranca solo Astro
- `npm run dev:cms`: arranca solo `decap-server`
- `npm run dev:full`: arranca Astro y el proxy local del CMS
- `npm run check`: valida tipos, rutas y colecciones
- `npm run build`: genera la version estatica de produccion

## Flujo editorial local

1. Ejecuta `npm run dev:full`
2. Abre `http://localhost:4321`
3. Entra en `http://localhost:4321/admin/`
4. Edita contenido desde Decap
5. Astro recompone la web con los archivos Markdown actualizados

## Decap CMS: lo que conviene entender

Decap no sirve las paginas. Decap edita archivos del repositorio.

El flujo real es este:

1. un editor crea o modifica contenido en `/admin`
2. Decap guarda Markdown dentro de `src/content`
3. Astro usa ese contenido para generar HTML estatico
4. GitHub Pages publica el resultado del build

## Produccion en GitHub Pages

La web publica funciona ya con GitHub Actions, pero el panel `/admin` en produccion tiene un matiz importante:

- para leer el panel, basta con publicar los archivos
- para guardar cambios en GitHub desde el navegador, hace falta OAuth

Eso significa que GitHub Pages publica la web sin problema, pero Decap necesita un proxy OAuth adicional para escribir en el repositorio desde produccion.

## Errores comunes que esta base intenta evitar

- mezclar logica editorial en cada pagina en lugar de centralizarla en utilidades
- cambiar el frontmatter sin actualizar el schema
- olvidar la subruta del repositorio en GitHub Pages
- asumir que Decap "ya funciona" en produccion sin resolver autenticacion

## Proximos pasos razonables

- personalizar mas el contenido inicial
- crear imagen Open Graph propia
- anadir paginacion
- anadir busqueda
- conectar OAuth para Decap en produccion
