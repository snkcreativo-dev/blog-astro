# Proxy recomendado para este proyecto

## Recomendacion cerrada

Para este blog, la opcion que recomiendo es:

- `Cloudflare Workers`
- proxy: `sterlingwes/decap-proxy`

No es la unica forma de hacerlo, pero para este caso tiene varias ventajas:

- funciona bien aunque la web este en GitHub Pages
- ya viene pensado para Decap CMS y GitHub
- trabaja con las rutas que Decap espera: `/auth` y `/callback`
- separa bien el panel del blog y la autenticacion

## Por que esta recomendacion encaja aqui

Este proyecto:

- ya esta desplegado como sitio estatico
- no necesita backend propio para el frontend
- solo necesita una pieza pequena para OAuth

Cloudflare Workers resuelve justo eso: una funcion minima, barata y facil de alojar aparte del blog.

## Stack final recomendado

### Sitio publico

- GitHub Pages
- repo: `snkcreativo-dev/blog-astro`

### CMS

- Decap CMS en `/admin`

### Autenticacion de produccion

- Cloudflare Worker independiente
- proxy basado en `sterlingwes/decap-proxy`

## URL recomendada del proxy

Si no quieres complicarte con dominios propios al principio, usa la URL por defecto de Workers:

```text
https://blog-astro-decap-auth.<tu-subdominio>.workers.dev
```

Si mas adelante quieres dejarlo mas limpio, puedes moverlo a algo como:

```text
https://decap-auth.tudominio.com
```

## Valores exactos que debes usar en este proyecto

Si el Worker queda publicado en:

```text
https://blog-astro-decap-auth.<tu-subdominio>.workers.dev
```

entonces la configuracion recomendada para Decap es:

```text
DECAP_AUTH_BASE_URL = https://blog-astro-decap-auth.<tu-subdominio>.workers.dev
DECAP_AUTH_ENDPOINT = auth
```

### Importante

La ruta real del proxy sera:

```text
https://blog-astro-decap-auth.<tu-subdominio>.workers.dev/auth
```

Por eso `DECAP_AUTH_ENDPOINT` debe ser `auth`, no la URL completa.

## Callback exacta para GitHub

En la OAuth App de GitHub, la callback debe ser:

```text
https://blog-astro-decap-auth.<tu-subdominio>.workers.dev/callback
```

## Flujo paso a paso

### 1. Crear el Worker

Usa el proyecto recomendado:

- `https://github.com/sterlingwes/decap-proxy`

Segun su README, el flujo general es:

1. clonar el repo
2. preparar `wrangler.toml`
3. autenticar Wrangler con Cloudflare
4. guardar secretos del Worker
5. desplegar

## 2. Crear la OAuth App en GitHub

En GitHub:

1. `Settings`
2. `Developer settings`
3. `OAuth Apps`
4. `New OAuth App`

Valores recomendados:

- `Application name`: `Blog Astro Decap Auth`
- `Homepage URL`: la URL del Worker
- `Authorization callback URL`: la URL del Worker terminada en `/callback`

### Ejemplo

```text
Homepage URL:
https://blog-astro-decap-auth.<tu-subdominio>.workers.dev

Authorization callback URL:
https://blog-astro-decap-auth.<tu-subdominio>.workers.dev/callback
```

## 3. Guardar secretos en Cloudflare

Dentro del Worker guarda:

- `GITHUB_OAUTH_ID`
- `GITHUB_OAUTH_SECRET`

Si el repo fuese privado, el proyecto recomendado tambien contempla esa configuracion en `wrangler.toml`.

## 4. Desplegar el Worker

El proyecto recomendado usa `wrangler`.

La secuencia normal es:

```bash
npx wrangler login
npx wrangler secret put GITHUB_OAUTH_ID
npx wrangler secret put GITHUB_OAUTH_SECRET
npx wrangler deploy
```

## 5. Conectar este blog con el Worker

En este proyecto, la configuracion ya esta preparada en [public/admin/index.html](</C:/snoker/astro-didactico/public/admin/index.html>).

Lo que falta es definir estos valores:

```html
<script>
	window.DECAP_AUTH_BASE_URL = 'https://blog-astro-decap-auth.<tu-subdominio>.workers.dev';
	window.DECAP_AUTH_ENDPOINT = 'auth';
</script>
```

## 6. Como queda el backend realmente

Con esos valores, Decap trabajara como si tuviera:

```js
backend: {
	name: 'github',
	repo: 'snkcreativo-dev/blog-astro',
	branch: 'main',
	use_graphql: true,
	base_url: 'https://blog-astro-decap-auth.<tu-subdominio>.workers.dev',
	auth_endpoint: 'auth',
}
```

## 7. Prueba final que debes hacer

Cuando todo este conectado:

1. abre `https://snkcreativo-dev.github.io/blog-astro/admin/`
2. pulsa login con GitHub
3. autoriza la app
4. comprueba que vuelves al CMS
5. edita una entrada
6. guarda
7. revisa que aparece el commit en GitHub
8. espera el redeploy de Actions

## Si algo falla, revisa esto primero

### Error de callback

Suele significar que GitHub tiene mal esta URL:

```text
https://blog-astro-decap-auth.<tu-subdominio>.workers.dev/callback
```

### Login abre pero no completa

Suele significar que:

- el Worker no esta bien desplegado
- `DECAP_AUTH_BASE_URL` no coincide con la URL real
- `DECAP_AUTH_ENDPOINT` no apunta a `auth`

### Entra en el CMS pero no guarda

Suele significar que:

- el usuario no tiene permisos de escritura en el repo
- el repo configurado no es `snkcreativo-dev/blog-astro`
- la rama no es `main`

## Recomendacion de criterio

Si quieres avanzar rapido, no inventes tu propio proxy ahora.

Haz esto:

1. despliega `sterlingwes/decap-proxy`
2. registra la OAuth App
3. fija `DECAP_AUTH_BASE_URL`
4. fija `DECAP_AUTH_ENDPOINT = auth`
5. prueba el login real en produccion

Es la ruta mas corta entre "entiendo el sistema" y "el CMS funciona de verdad".

## Fuentes

- Decap recomienda un proxy OAuth para GitHub y menciona como opcion ligera un worker o servidor serverless:
  `https://decapcms.org/docs/backends-overview/`
- El backend GitHub de Decap requiere servidor para autenticacion:
  `https://decapcms.org/docs/github-backend/`
- El proyecto recomendado documenta callback, secretos y `auth_endpoint` con Cloudflare Workers:
  `https://github.com/sterlingwes/decap-proxy`
