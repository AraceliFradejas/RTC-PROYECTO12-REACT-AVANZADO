# Despliegue · The Tortured Poets Challenge

Web publicada el 27 de septiembre de 2026: [The Poets Archive](https://the-poets-archive.vercel.app).

Proyecto Vercel: `rtc-proyecto-12-react-avanzado`, conectado a la rama `main` de GitHub. Dominio principal: `the-poets-archive.vercel.app`. La dirección inicial `rtc-proyecto-12-react-avanzado.vercel.app` redirige a la principal.

## Configuración reproducible

1. Importar `AraceliFradejas/RTC-PROYECTO12-REACT-AVANZADO` en Vercel.
2. Utilizar la raíz del repositorio, una versión de Node.js compatible con `package.json`, `npm run build` y salida `dist`.
3. Asignar el dominio definitivo del proyecto.
4. Añadir `SITE_URL` con el origen HTTPS, sin ruta ni barra final, y volver a desplegar.

No hay variables secretas. `SITE_URL` es pública y se utiliza durante el build. La aplicación funciona sin ella, pero no se generan canónicas ni sitemap hasta conocer una dirección válida. El archivo `.env.example` sirve como referencia; para el build local hay que exportar la variable en el entorno del comando.

```bash
SITE_URL=https://the-poets-archive.vercel.app npm run build
npm run preview
```

`SITE_URL` está configurada en Vercel para Production y Preview. Al cambiarla es necesario generar un nuevo despliegue.

## Rutas y HTML

El build genera `index.html`, `instrucciones.html`, `archivo.html`, `partida.html`, `resultados.html`, `cuaderno.html`, `cronologia.html` y `404.html`. También genera `en.html` y las páginas equivalentes dentro de `en/` (`how-to-play`, `archive`, `game`, `results`, `notebook`, `timeline` y `404`). `cleanUrls` sirve las páginas de Vercel sin extensión. Las rutas editoriales se pueden leer sin JavaScript; React las hidrata al cargar. Una URL desconocida debe devolver HTTP 404 con la página correspondiente.

No se debe añadir una reescritura global que envíe todas las peticiones a la portada: impediría que los rastreadores recibieran el HTML propio de cada página.

## Lista de comprobación de producción

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

## Alcance de la revisión

Se han comprobado por HTTP las rutas públicas y de juego, el HTML de archivo, los metadatos, sitemap, robots y llms. En Chrome se ha abierto la web pública, iniciado una partida, respondido correctamente y guardado una obra en el cuaderno. También se ejecutaron las 28 pruebas automatizadas contra el dominio público, todas correctas, incluyendo los tres capítulos y ambos idiomas. La variable `PLAYWRIGHT_BASE_URL` permite repetir esta comprobación sin iniciar un servidor local.

Las rutas desconocidas devuelven HTTP 404 y `noindex`. Vercel sirve inicialmente el documento 404 español también para una URL desconocida bajo `/en/`; con JavaScript, React adapta esa pantalla al idioma de la URL. Las rutas inglesas existentes sí reciben su HTML en inglés desde el servidor.

Safari de macOS pasó un recorrido manual de cambio de idioma, respuesta, favorito y reinicio al recargar. El alcance exacto figura en [VALIDACION.md](VALIDACION.md). Siguen pendientes móvil físico y auditoría con lector de pantalla.
