# Validación local · 27 de septiembre de 2026

## Entorno y alcance

Node.js 22.23.2, Chrome en macOS, aplicación compilada con Vite. Las pruebas de Playwright utilizan escritorio de 1280 × 720 y un perfil móvil de 390 × 664 píxeles CSS. Se añaden comprobaciones de anchura a 320, 768 y 1440 píxeles. El perfil móvil utiliza Chromium: no acredita una revisión de Safari o de un iPhone físico.

## Resultados

| Comprobación | Resultado |
| --- | --- |
| `npm run lint` | Sin errores ni avisos |
| `npm test` | 17 pruebas de reglas, catálogo, idiomas, cronología y cuaderno correctas |
| `npm run build` | Compilación y generación de HTML correctas |
| Pruebas de Playwright | 28 casos en navegador correctos (ES/EN) |
| axe-core WCAG 2 A/AA y 2.1 AA | Sin infracciones detectadas en inicio, reglas, archivo, pregunta, revelación, resultados, cuaderno y cronología |
| `npm run check:renders` | Tres cambios de segundo sin nuevos renderizados de Game ni QuestionCard |
| Instalación de dependencias | Cero vulnerabilidades notificadas por npm tras la actualización |

Los números corresponden a esta revisión. Los recursos de terceros y las dependencias pueden cambiar; no se asume que el resultado sea permanente.

## Enlaces externos

Revisión de los veinte destinos del catálogo (vídeos, canciones y pasajes), referencias del formato, archivo de eras, escuela y GitHub. Evidencias y límites en [ENLACES.md](ENLACES.md).

## Casos funcionales

- Capítulo de obras: cuatro opciones de la misma procedencia, respuesta correcta única y repaso con el mismo capítulo.
- Cronología: ordenación con botones, cambio de idioma sin perder posiciones, finalización, sello e historial.
- Cuaderno: descubrimiento, favorito, búsqueda, filtro de guardados, confirmación de vaciado y borrado al recargar.
- La web de desarrollo en el puerto 5173 se ha comprobado directamente: sin errores de página ni overlay de Vite.

- Diez respuestas, un error, un acierto con pista: resultado de 850 puntos.
- Un doble clic no duplica respuesta ni puntuación.
- Tres pistas como máximo, una por pregunta; el descuento no afecta a la siguiente.
- La racha se reinicia tras un fallo, conservando la mejor.
- Un plazo vencido bloquea un acierto tardío y revela tiempo agotado.
- La cuenta atrás se detiene al responder y se elimina al abandonar.
- Navegar a las instrucciones y regresar no reinicia el plazo.
- Repasar un solo error produce una ronda de una pregunta y marcador nuevo.
- Borrar el resultado y recargar dejan la sesión vacía.
- Rutas directas y desconocidas, un h1 por pantalla y sin desbordamiento horizontal.
- Archivo con diez referencias visible sin JavaScript.
- Versiones inglesas de portada, instrucciones y archivo servidas como HTML sin JavaScript.
- Cambio ES/EN durante una pregunta, tras revelar la respuesta y en resultados, sin perder estado.
- Modo seleccionado, pista utilizada y plazo del reloj conservados al cambiar idioma.
- Footer académico con enlace a The Power Tech School y aviso solo en el idioma elegido.
- Canónicas, alternativas `hreflang` y seis URL públicas en el sitemap comprobadas con un dominio de prueba; el dominio real sigue pendiente.
- Enlace de salto al contenido y foco en pregunta y revelación.

## Medición de renderizados

El script `scripts/check-renders.mjs` utiliza el protocolo de React DevTools en desarrollo. Cuenta commits con trabajo de renderizado de Game, QuestionCard y Timer. El reloj de prueba avanza tres segundos.

| Componente | Antes | Después |
| --- | ---: | ---: |
| Game | 1 | 1 |
| QuestionCard | 1 | 1 |
| Timer | 1 | 4 |

Esta medición corresponde al paso de los segundos, no a todas las interacciones posibles. Una respuesta o una pista sí requiere actualizar la interfaz. StrictMode puede invocar funciones adicionalmente en desarrollo; la tabla cuenta trabajo confirmado en commits, no todas las invocaciones internas.

## Capturas reales

| Pantalla | Escritorio | Móvil |
| --- | --- | --- |
| Inicio ES | [Abrir](screenshots/inicio-desktop.jpg) | [Abrir](screenshots/inicio-mobile.jpg) |
| Inicio EN | [Abrir](screenshots/inicio-en-desktop.jpg) | [Abrir](screenshots/inicio-en-mobile.jpg) |
| Instrucciones | [Abrir](screenshots/instrucciones-desktop.jpg) | [Abrir](screenshots/instrucciones-mobile.jpg) |
| Archivo | [Abrir](screenshots/archivo-desktop.jpg) | [Abrir](screenshots/archivo-mobile.jpg) |
| Partida | [Abrir](screenshots/partida-desktop.jpg) | [Abrir](screenshots/partida-mobile.jpg) |
| Resultados | [Abrir](screenshots/resultados-desktop.jpg) | [Abrir](screenshots/resultados-mobile.jpg) |
| Cuaderno | [Abrir](screenshots/cuaderno-desktop.jpg) | [Abrir](screenshots/cuaderno-mobile.jpg) |
| Cronología | [Abrir](screenshots/cronologia-desktop.jpg) | [Abrir](screenshots/cronologia-mobile.jpg) |

Las capturas se generan como JPEG a escala CSS para evitar un peso innecesario. Están en la documentación y no se sirven como recursos de la aplicación. La pregunta visible puede variar porque el orden es aleatorio.

## SEO, GEO y límites

Se comprueba que el HTML de las páginas editoriales se sirve sin JavaScript. Los metadatos de rutas privadas incluyen `noindex`. Canónicas y sitemap dependen de configurar `SITE_URL` durante el build. `llms.txt` describe el proyecto y apunta a contenido visible; no garantiza inclusión en respuestas de asistentes.

La revisión automática de accesibilidad no sustituye una auditoría manual completa. Quedan pendientes lector de pantalla, Safari, móvil real y verificación HTTP del despliegue. No se atribuyen puntuaciones Lighthouse, Core Web Vitals de campo ni posiciones SEO sin mediciones.
