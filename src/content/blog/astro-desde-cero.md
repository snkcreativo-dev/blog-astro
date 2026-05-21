---
title: "Astro desde cero sin perderse en el scaffold"
description: "Ideas para entender que partes del proyecto son esenciales y cuales son solo soporte."
excerpt: "Un mapa mental rapido para diferenciar contenido, rutas, layouts y configuracion en un proyecto Astro."
publishDate: 2026-05-20
draft: false
author: "Equipo Editorial"
tags:
  - Astro
  - Rutas
  - Layouts
---

Cuando alguien abre Astro por primera vez, suele ver muchos archivos a la vez y no siempre queda claro cuales son estructurales y cuales son solo ergonomia.

## Las cuatro piezas que conviene entender primero

### 1. `src/pages`

Es el sistema de rutas.

Cada archivo dentro de esa carpeta representa una URL. En un blog, aqui viven la portada, el listado de articulos, la pagina de detalle y cualquier pagina estatica.

### 2. `src/layouts`

Un layout no es una pagina. Es un armazon reutilizable.

Suele contener:

- `<head>`
- cabecera
- pie
- contenedor principal

### 3. `src/content`

Aqui vive el contenido real. Es donde el proyecto gana valor con el tiempo.

Separar contenido y presentacion permite cambiar el diseno sin tocar los textos, y viceversa.

### 4. `astro.config.mjs`

Es la configuracion global de Astro.

En este proyecto no solo configura el sitio: tambien resuelve una necesidad practica de GitHub Pages, que es la subruta cuando el repositorio no se publica en la raiz del dominio.

## Una regla muy util

Si un archivo cambia como se ve el sitio, probablemente pertenece a `pages`, `layouts`, `components` o `styles`.

Si cambia lo que el sitio cuenta, probablemente pertenece a `content`.
