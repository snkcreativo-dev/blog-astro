---
title: "Bienvenida a Notas de Taller"
description: "Una introduccion a la base del proyecto y a la idea del blog."
excerpt: "Por que este proyecto usa Astro, Markdown y una arquitectura pensada para aprender sin improvisaciones."
publishDate: 2026-05-21
featured: true
draft: false
author: "Equipo Editorial"
tags:
  - Astro
  - Arquitectura
  - Aprendizaje
cover: "/uploads/cover-bienvenida.svg"
coverAlt: "Ilustracion abstracta con bloques editoriales y formas calidas."
---

Empezar un blog tecnico suele fallar por dos extremos:

- una base demasiado simple que se queda corta enseguida
- una base demasiado compleja que cuesta entender desde el dia uno

Este proyecto intenta quedarse en el punto medio correcto.

## Que queremos conseguir

La idea de esta base es que puedas aprender mientras construyes algo publicable:

- contenido en Markdown facil de mantener
- una estructura clara de componentes, layouts y utilidades
- despliegue automatico a GitHub Pages
- un CMS que edite exactamente los mismos archivos que usa el blog

## Por que Astro encaja bien aqui

Astro es especialmente comodo para un blog porque separa muy bien tres capas:

1. contenido
2. presentacion
3. despliegue

Eso es valioso en un proyecto didactico porque cada pieza se puede estudiar por separado sin perder la imagen general.

## Como leer este proyecto

Si estas aprendiendo, la ruta mas util suele ser esta:

1. revisar `src/content.config.ts`
2. mirar `src/utils/blog.ts`
3. entender `src/pages/blog/[slug].astro`
4. abrir `public/admin/index.html`

Ese recorrido ensena el flujo completo:

- donde nace el contenido
- como se valida
- como se renderiza
- como se edita desde una interfaz amigable
