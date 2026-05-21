# Contenido y CMS

## Donde vive el contenido

Hay dos colecciones principales:

- `blog`: articulos listables
- `pages`: paginas fijas editables

## Content Collections

El archivo `src/content.config.ts` hace algo muy importante:

- valida el frontmatter
- tipa el contenido
- evita que el frontend consuma campos inesperados

Esto convierte Markdown en contenido fiable, no en texto suelto.

## Flujo de Decap CMS

Decap no sirve las paginas del blog.
Decap edita archivos del repositorio.

El flujo es este:

1. el editor entra en `/admin`
2. crea o modifica una entrada
3. Decap guarda Markdown en `src/content`
4. Astro recompila la web con ese contenido

## Modo local

Para editar en local:

```bash
npm run dev:full
```

Esto arranca:

- Astro en `http://localhost:4321`
- `decap-server` en `http://localhost:8081`

## Produccion

El panel `/admin` queda publicado, pero para guardar en GitHub desde produccion hace falta OAuth.

Eso significa:

- la lectura del panel esta lista
- la escritura en produccion necesita un proxy adicional

## Error comun

Pensar que con publicar `/admin` ya queda resuelto el CMS en produccion.

No es asi.
GitHub Pages publica archivos, pero no te da automaticamente la autenticacion que Decap necesita para escribir en el repositorio.
