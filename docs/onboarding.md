# Onboarding para una nueva persona del equipo

## Objetivo de esta guia

Esta guia sirve para que alguien que no ha tocado nunca este proyecto pueda arrancar sin adivinar cosas.

La idea es responder rapido a estas preguntas:

1. que tengo que instalar
2. como levanto el proyecto
3. donde esta cada cosa
4. como hago cambios sin romper la base

## 1. Requisitos

Necesitas:

- Node.js 22 o superior
- npm
- Git

Version de referencia del proyecto:

```text
Node 22+
```

## 2. Primer arranque

Desde la raiz del proyecto:

```bash
npm install
npm run dev
```

Si tambien quieres probar el CMS en local:

```bash
npm run dev:full
```

Esto levanta:

- sitio en `http://localhost:4321`
- proxy local de Decap en `http://localhost:8081`
- panel CMS en `http://localhost:4321/admin/`

## 3. Que mirar primero

### Si quieres entender la arquitectura

Lee en este orden:

1. `README.md`
2. `docs/arquitectura.md`
3. `docs/mapa-de-archivos.md`

### Si quieres entender el contenido

Lee en este orden:

1. `src/content.config.ts`
2. `src/content/blog/`
3. `public/admin/index.html`

### Si quieres entender el frontend

Lee en este orden:

1. `src/layouts/BaseLayout.astro`
2. `src/components/`
3. `src/styles/global.css`
4. `src/pages/`

## 4. Flujo de trabajo recomendado

### Cambios de contenido

1. editar Markdown en `src/content`
2. revisar la pagina correspondiente
3. validar con `npm run check`

### Cambios visuales

1. revisar primero tokens y reglas base en `src/styles/global.css`
2. tocar luego el componente concreto
3. comprobar portada, archivo y detalle

### Cambios de estructura o datos

1. cambiar schema en `src/content.config.ts`
2. adaptar CMS si hace falta
3. adaptar frontend
4. validar con `npm run check` y `npm run build`

## 5. Comandos que no deberias saltarte

Antes de hacer push:

```bash
npm run check
npm run build
```

## 6. Donde suelen aparecer errores

### Frontmatter

Cuando una entrada falla, muchas veces el problema esta en:

- campo inexistente
- tipo incorrecto
- fecha mal formada

### GitHub Pages

Si la web funciona en local pero no en produccion, revisa:

- `SITE_URL`
- `BASE_PATH`
- uso de `withBase()`

### Decap CMS

Si `/admin` abre pero no guarda en produccion, revisa:

- autenticacion OAuth
- `DECAP_AUTH_BASE_URL`
- `DECAP_AUTH_ENDPOINT`

Guia recomendada:

- [docs/decap-oauth-produccion.md](</C:/snoker/astro-didactico/docs/decap-oauth-produccion.md>)

## 7. Regla mental util

Cuando no sepas donde tocar:

- si cambia lo que el sitio cuenta, probablemente es `content`
- si cambia como se ve, probablemente es `components`, `layouts` o `styles`
- si cambia como se publica, probablemente es `astro.config.mjs` o `.github/workflows/deploy.yml`
