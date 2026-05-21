# Despliegue y rutas

## GitHub Pages y subruta

Este proyecto se publica como repositorio de proyecto:

```text
https://snkcreativo-dev.github.io/blog-astro/
```

Eso significa que la web no vive en `/`, sino en `/blog-astro/`.

## Por que existe `withBase()`

La utilidad `src/utils/links.ts` adapta las rutas internas a `import.meta.env.BASE_URL`.

Sin esa capa, enlaces y assets pueden funcionar en local pero romperse al desplegar.

## Workflow de despliegue

El archivo `.github/workflows/deploy.yml` hace este recorrido:

1. checkout del repo
2. setup de Node
3. resolucion de `SITE_URL` y `BASE_PATH`
4. instalacion de dependencias
5. validacion con `npm run check`
6. build con `npm run build`
7. subida de `dist/`
8. despliegue en Pages

## Rutas estaticas

Archivos como:

- `src/pages/blog/[slug].astro`
- `src/pages/temas/[tag].astro`

usan `getStaticPaths()`.

En Astro esto significa que las rutas se generan durante el build, no en cliente.

## Consecuencia practica

Si una entrada esta en la coleccion y no es borrador:

- puede generar su pagina individual
- puede aparecer en portada
- puede entrar en RSS
- puede entrar en taxonomias

Todo eso ocurre sin llamadas a APIs en runtime.
