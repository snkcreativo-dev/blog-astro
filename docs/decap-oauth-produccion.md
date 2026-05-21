# Decap CMS en produccion con proxy OAuth

## Objetivo de esta guia

Esta guia explica como completar la ultima pieza importante de Decap CMS en este proyecto:

- publicar `/admin` ya esta resuelto
- editar en local ya esta resuelto
- guardar cambios en GitHub desde la web publica todavia requiere autenticacion OAuth

Aqui vamos a cubrir:

1. por que hace falta un proxy
2. que hace `DECAP_AUTH_BASE_URL`
3. que hace `DECAP_AUTH_ENDPOINT`
4. como registrar la OAuth App en GitHub
5. como desplegar un proxy
6. como conectar todo con este proyecto
7. como probar que realmente funciona

## Antes de empezar: la idea clave

GitHub Pages publica archivos estaticos.
Decap CMS, en cambio, necesita autenticarse contra GitHub para poder crear commits en el repositorio.

Por eso `/admin` se puede abrir sin problema, pero guardar cambios en produccion requiere un servidor intermedio muy pequeno: el proxy OAuth.

Ese proxy hace dos trabajos:

- redirigir al usuario al login/autorizacion de GitHub
- recibir el `code` de vuelta y cambiarlo por un token

## Como encaja con este proyecto

La configuracion ya esta preparada en [public/admin/index.html](</C:/snoker/astro-didactico/public/admin/index.html>).

En produccion, el backend de Decap se monta asi:

```js
{
	name: 'github',
	repo,
	branch: 'main',
	use_graphql: true,
	...(window.DECAP_AUTH_BASE_URL ? { base_url: window.DECAP_AUTH_BASE_URL } : {}),
	...(window.DECAP_AUTH_ENDPOINT ? { auth_endpoint: window.DECAP_AUTH_ENDPOINT } : {}),
}
```

### Que significa cada variable

#### `DECAP_AUTH_BASE_URL`

Es la URL base del servicio donde vive tu proxy OAuth.

Ejemplo:

```text
https://decap-auth.tudominio.com
```

o:

```text
https://mi-proxy-oauth.pages.dev
```

No debe incluir la ruta final `/auth` ni `/callback`, solo la base.

#### `DECAP_AUTH_ENDPOINT`

Es la ruta que Decap anade a `base_url` para iniciar la autenticacion.

Ejemplo habitual:

```text
auth
```

Si tu proxy escucha en otra ruta, pones esa ruta aqui. Por ejemplo:

```text
oauth
```

### Resultado final

Si configuras:

```text
DECAP_AUTH_BASE_URL=https://decap-auth.tudominio.com
DECAP_AUTH_ENDPOINT=auth
```

Decap intentara abrir:

```text
https://decap-auth.tudominio.com/auth
```

## Que rutas debe exponer el proxy

Segun la documentacion de Decap, el proxy debe gestionar al menos estas rutas:

- `/auth`
- `/callback`

Flujo normal:

1. el usuario pulsa login en `/admin`
2. Decap abre una ventana contra `base_url + auth_endpoint`
3. el proxy redirige al flujo OAuth de GitHub
4. GitHub devuelve al usuario a la callback configurada
5. el proxy intercambia el `code` por un token y se lo devuelve a Decap con `window.postMessage`

## Paso 1: crear una OAuth App en GitHub

En GitHub:

1. entra en `Settings`
2. entra en `Developer settings`
3. entra en `OAuth Apps`
4. pulsa `New OAuth App`

Campos importantes:

- `Application name`: el nombre que quieras
- `Homepage URL`: la URL publica del blog
- `Authorization callback URL`: la URL de callback de tu proxy

### Ejemplo real para este proyecto

Si el blog vive en:

```text
https://snkcreativo-dev.github.io/blog-astro/
```

y tu proxy vive en:

```text
https://decap-auth.tudominio.com
```

entonces la callback tipica seria:

```text
https://decap-auth.tudominio.com/callback
```

### Error comun

No pongas como callback la URL de `/admin`.

La callback pertenece al proxy, no al panel de Decap.

## Paso 2: elegir donde alojar el proxy

Decap no obliga a un proveedor concreto. Puedes usar, por ejemplo:

- Cloudflare Workers / Pages Functions
- Vercel Functions
- Netlify Functions
- una app Node pequena
- cualquier servidor o edge function que exponga `/auth` y `/callback`

## Paso 3: montar el proxy

Aqui hay dos caminos razonables.

### Opcion A: usar un proyecto ya hecho

Es la opcion mas rapida.

Decap mantiene una lista de clientes OAuth externos en su documentacion. La ventaja es que ya traen resuelta la parte delicada del flujo:

- redireccion a GitHub
- callback
- intercambio del codigo por token
- mensaje de vuelta a Decap

Cuando uses uno de esos proyectos, normalmente te pedira:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- la URL publica del proxy

### Opcion B: montar tu propio proxy

Solo la recomendaria si quieres aprender el flujo OAuth a bajo nivel o controlar toda la infraestructura.

En ese caso tu proxy necesita:

1. ruta `/auth`
2. ruta `/callback`
3. acceso al `client_id`
4. acceso al `client_secret`
5. cambiar el `code` por un access token contra GitHub
6. devolver el resultado a la ventana original de Decap

## Paso 4: guardar secretos del proxy

Donde alojes el proxy, crea secretos o variables protegidas para:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

No pongas nunca el `client_secret` dentro del frontend del blog ni dentro de `public/admin/index.html`.

### Por que es importante

`public/admin/index.html` se sirve al navegador.
Todo lo que pongas ahi es publico.

## Paso 5: definir `DECAP_AUTH_BASE_URL` y `DECAP_AUTH_ENDPOINT`

En este proyecto hay dos formas practicas de hacerlo.

### Opcion simple: dejarlas hardcodeadas en `public/admin/index.html`

Si no necesitas variarlas por entorno, puedes definirlas asi:

```html
<script>
	window.DECAP_AUTH_BASE_URL = 'https://decap-auth.tudominio.com';
	window.DECAP_AUTH_ENDPOINT = 'auth';
</script>
```

### Opcion mas limpia: inyectarlas durante build

Si mas adelante quieres separar staging y produccion, conviene que estas variables se inyecten desde un paso de build o desde una plantilla.

En este proyecto, como `public/admin/index.html` es estatico, la opcion mas sencilla sigue siendo la primera.

## Paso 6: valores recomendados para este repo

Si tu proxy expone:

- `https://decap-auth.tudominio.com/auth`
- `https://decap-auth.tudominio.com/callback`

entonces deberias usar:

```text
DECAP_AUTH_BASE_URL = https://decap-auth.tudominio.com
DECAP_AUTH_ENDPOINT = auth
```

Si tu proxy usa:

- `https://decap-auth.tudominio.com/oauth`
- `https://decap-auth.tudominio.com/callback`

entonces:

```text
DECAP_AUTH_BASE_URL = https://decap-auth.tudominio.com
DECAP_AUTH_ENDPOINT = oauth
```

## Paso 7: probarlo bien

Haz esta comprobacion completa:

1. entra en la web publica
2. abre `/admin`
3. pulsa login con GitHub
4. comprueba que se abre la ventana OAuth
5. autoriza la app
6. vuelve a Decap
7. crea un borrador o edita una entrada
8. guarda
9. confirma que aparece el commit en GitHub
10. espera el redeploy de GitHub Actions

## Como diagnosticar si falla

### Caso 1: `/admin` abre, pero no aparece login

Revisa:

- que el backend en produccion siga siendo `github`
- que no se haya activado por error `local_backend`

### Caso 2: se abre login, pero GitHub da error de callback

Revisa:

- la `Authorization callback URL` de la OAuth App
- que coincida con la ruta real del proxy

### Caso 3: vuelve de GitHub, pero Decap no termina el login

Revisa:

- que el proxy implemente bien `/callback`
- que devuelva el mensaje a la ventana original
- que `DECAP_AUTH_BASE_URL` y `DECAP_AUTH_ENDPOINT` apunten al servicio correcto

### Caso 4: entra al CMS, pero no guarda

Revisa:

- que el usuario tenga permisos de escritura en el repo
- que el repo configurado sea `snkcreativo-dev/blog-astro`
- que la rama sea `main`

## Flujo mental correcto

Cuando trabajes esta parte, piensa asi:

- Astro genera el sitio
- GitHub Pages publica el sitio
- Decap edita contenido
- GitHub protege la escritura
- el proxy OAuth resuelve esa autenticacion

Si mezclas esas responsabilidades, el problema se vuelve confuso.

## Recomendacion practica para este proyecto

Si tu objetivo es llegar rapido a una version funcional:

1. elige un proxy externo ya hecho
2. despliegalo en un servicio serverless
3. registra la OAuth App en GitHub
4. define `DECAP_AUTH_BASE_URL`
5. define `DECAP_AUTH_ENDPOINT`
6. prueba login y guardado en produccion

Si tu objetivo es aprender el flujo en profundidad, entonces ya si tiene sentido crear tu propio proxy.

## Fuentes oficiales que conviene tener a mano

- Decap CMS backend overview:
  `https://decapcms.org/docs/backends-overview/`
- Decap CMS GitHub backend:
  `https://decapcms.org/docs/github-backend/`
- Decap CMS external OAuth clients:
  `https://decapcms.org/docs/external-oauth-clients/`
- GitHub OAuth Apps:
  `https://docs.github.com/en/developers/apps/creating-an-oauth-app`
- GitHub authorization flow:
  `https://docs.github.com/apps/building-oauth-apps/authorizing-oauth-apps`

## Resumen corto

Lo importante para este proyecto es esto:

- `DECAP_AUTH_BASE_URL` apunta al dominio base de tu proxy
- `DECAP_AUTH_ENDPOINT` apunta a la ruta que inicia el login
- la callback se configura en GitHub y pertenece al proxy
- sin ese proxy, `/admin` puede abrir pero no escribir en GitHub Pages
