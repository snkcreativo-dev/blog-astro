---
title: "Flujo editorial con Decap CMS y Git"
description: "Como encaja un CMS Git-based dentro de un proyecto Astro."
excerpt: "Decap no reemplaza Astro: trabaja encima del repositorio y actualiza el contenido que luego Astro compila."
publishDate: 2026-05-19
draft: false
author: "Equipo Editorial"
tags:
  - Decap CMS
  - Git
  - Editorial
---

Una confusion habitual es pensar que Decap CMS "sirve las paginas". No lo hace.

## Que hace realmente Decap

Decap es una interfaz para editar archivos del repositorio.

Eso significa que:

- el contenido sigue versionado en Git
- puedes revisar cambios con commits
- Astro sigue siendo quien construye el sitio final

## Como encaja con este proyecto

El flujo es este:

1. un editor entra en `/admin`
2. crea o modifica contenido
3. Decap guarda archivos Markdown en `src/content`
4. Astro vuelve a compilar el sitio con ese contenido

## Ventaja didactica

Este enfoque obliga a entender bien el contrato entre frontend y contenido.

No hay "magia" escondida en una base de datos. Todo queda visible:

- esquema
- archivos
- rutas
- despliegue

## Limite importante en GitHub Pages

Para editar en produccion con backend GitHub hace falta un flujo OAuth. No es una limitacion de Astro, sino del modo en que GitHub protege la escritura en repositorios desde aplicaciones web.

Por eso esta base deja el modo local resuelto y el modo produccion preparado, pero documentado con claridad.
