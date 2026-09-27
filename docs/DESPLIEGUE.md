# Despliegue · The Tortured Poets Challenge

El repositorio incluye configuración para Vercel. Esta guía no implica que la web ya esté publicada.

## Preparación

1. Importar `AraceliFradejas/RTC-PROYECTO12-REACT-AVANZADO` en Vercel.
2. Utilizar la raíz del repositorio, Node.js 22, `npm run build` y salida `dist`.
3. Asignar el dominio definitivo del proyecto.
4. Añadir `SITE_URL` con el origen HTTPS, sin ruta ni barra final, y volver a desplegar.

No hay variables secretas. `SITE_URL` es pública y se utiliza durante el build. La aplicación funciona sin ella, pero no se generan canónicas ni sitemap hasta conocer una dirección válida. El archivo `.env.example` sirve como referencia; para el build local hay que exportar la variable en el entorno del comando.

```bash
SITE_URL=https://tu-dominio-real.vercel.app npm run build
npm run preview
```

Sustituir el ejemplo por el dominio real. No publicar el dominio de ejemplo.

## Rutas y HTML

El build genera `index.html`, `instrucciones.html`, `archivo.html`, `partida.html`, `resultados.html`, `cuaderno.html`, `cronologia.html` y `404.html`. También genera `en.html` y las páginas equivalentes dentro de `en/` (`how-to-play`, `archive`, `game`, `results`, `notebook`, `timeline` y `404`). `cleanUrls` sirve las páginas de Vercel sin extensión. Las rutas editoriales se pueden leer sin JavaScript; React las hidrata al cargar. Una URL desconocida debe devolver HTTP 404 con la página correspondiente.

No se debe añadir una reescritura global que envíe todas las peticiones a la portada: impediría que los rastreadores recibieran el HTML propio de cada página.

## Comprobación de producción pendiente

- Abrir inicio, reglas y archivo directamente y recargar cada ruta, tanto en ES como en EN.
- Comprobar `lang="en-GB"`, `og:locale="en_GB"` y alternativas `hreflang` en la versión inglesa.
- Comprobar el contenido de `/archivo` con JavaScript desactivado.
- Confirmar título, descripción, canónica y `og:url` con el dominio publicado.
- Revisar `/robots.txt`, `/sitemap.xml` y `/llms.txt`.
- Confirmar `noindex` en partida, resultados y página 404.
- Verificar HTTP 404 en una ruta desconocida.
- Jugar ambos modos, terminar, repasar y borrar resultados en la web publicada.
- Revisar móvil real, Safari y teclado; la automatización local utiliza Chromium.
- Completar el enlace de demo del README y actualizar el estado de la memoria con evidencias.

## Git y autoría

Los nuevos commits se crean con nombre y correo ya utilizados por Araceli en el repositorio, mensajes en castellano y sin trailers de coautoría. El commit inicial remoto se conserva sin reescribirlo. GitHub figura como committer de ese commit inicial creado desde la plataforma; no es una segunda autoría del proyecto.
