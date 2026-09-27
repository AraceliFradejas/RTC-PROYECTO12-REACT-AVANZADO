# Validación local y de producción · 27 de septiembre de 2026

## Entorno y alcance

Node.js 22.23.2, Chrome en macOS, aplicación compilada con Vite. Las pruebas de Playwright utilizan escritorio de 1280 × 720 y un perfil móvil de 390 × 664 píxeles CSS. Se añaden comprobaciones de anchura a 320, 768 y 1440 píxeles. El perfil móvil utiliza Chromium: no acredita una revisión de Safari o de un iPhone físico.

## Resultados

| Comprobación | Resultado |
| --- | --- |
| `npm run lint` | Sin errores ni avisos |
| `npm test` | 18 pruebas de reglas, catálogo, idiomas, cronología y cuaderno correctas |
| `npm run build` | Compilación y generación de HTML correctas |
| Pruebas de Playwright | 30 casos correctos en local y 28 contra producción antes del ajuste móvil (ES/EN) |
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
- Canónicas, alternativas `hreflang` y seis URL públicas en el sitemap: revisión local y comprobación HTTP del dominio de Vercel; alcance en [DESPLIEGUE.md](DESPLIEGUE.md).
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

Las capturas se han actualizado contra la compilación local al revisar el ajuste móvil. Se generan como JPEG a escala CSS para evitar un peso innecesario. Están en la documentación y no se sirven como recursos de la aplicación. La pregunta visible puede variar porque el orden es aleatorio.

## SEO, GEO y límites

Se comprueba que el HTML de las páginas editoriales se sirve sin JavaScript. Los metadatos de rutas privadas incluyen `noindex`. Canónicas y sitemap dependen de configurar `SITE_URL` durante el build. `llms.txt` describe el proyecto y apunta a contenido visible; no garantiza inclusión en respuestas de asistentes.

La revisión automática de accesibilidad no sustituye una auditoría manual completa. Quedan pendientes una auditoría con lector de pantalla y una revisión en móvil físico. No se atribuyen puntuaciones Lighthouse, Core Web Vitals de campo ni posiciones SEO sin mediciones.

## Comprobación de la web publicada

El 27 de septiembre de 2026 se ejecutó la misma suite contra el dominio público:

```bash
PLAYWRIGHT_BASE_URL=https://the-poets-archive.vercel.app npm run test:e2e
```

Resultado: 28 pruebas correctas en 12,4 segundos. Incluye partidas completas de los tres capítulos, repaso, temporizador, cuaderno, navegación ES/EN, HTML sin JavaScript y accesibilidad automática. Los perfiles de escritorio y móvil utilizan Chromium.

En Safari de macOS se comprobó manualmente portada, cambio a inglés británico, inicio de La obra oculta, respuesta correcta con 100 puntos, guardado de Hamlet en el cuaderno, regreso al castellano conservando el favorito y recarga con sesión vacía. Se revisó visualmente el cuaderno. Este recorrido breve no equivale a ejecutar toda la suite en Safari.

## Ajuste del selector para iPhone 13

Tras revisar la web en móvil, se redujeron los espacios de las tarjetas y se conservaron a la vista título, resumen y tipo de desafío. Las descripciones ampliadas siguen disponibles para lectores de pantalla. El botón de comenzar permanece visible dentro del selector mediante `position: sticky`, con espacio para el área segura inferior.

Se comprobó en Chromium con perfil iPhone 13: pantalla de 390 × 844 y área útil de 390 × 664 píxeles CSS. También se probaron anchuras de 320 y 700 píxeles en ES/EN. La prueba verifica que el botón esté completamente visible, que no tape la tarjeta seleccionada y que permita iniciar la cronología. No sustituye una prueba en iPhone físico.

Lint, 17 pruebas unitarias, build y 30 recorridos de navegador correctos. Capturas: [selector ES](screenshots/selector-iphone13-es.jpg) y [selector EN](screenshots/selector-iphone13-en.jpg).

## Arrastre de eras

Lint, 18 pruebas unitarias y compilación correctos tras incorporar el arrastre. Se comprobaron los seis recorridos existentes de capítulos y dos nuevos recorridos de arrastre, en escritorio y móvil. Los nuevos casos mueven una tarjeta varias posiciones con ratón o eventos táctiles de Chromium, conservan el orden entre ES/EN, cancelan con Escape, reordenan con teclado y realizan una comprobación automática de accesibilidad sin infracciones detectadas.

La prueba del reducer cubre inserción hacia delante y atrás, conservación de los álbumes, inmutabilidad, destinos inválidos y bloqueo al terminar. El arrastre no añade comprobaciones ni revela las fechas.

Capturas: [escritorio](screenshots/arrastre-eras-desktop.jpg) y [perfil móvil de iPhone 13](screenshots/arrastre-eras-mobile.jpg). Los gestos táctiles son emulados; queda la comprobación del gesto en un teléfono físico.

## Contador visible en el modo contrarreloj

El contador anterior podía quedar por encima del área visible al desplazarse hasta las respuestas. Ahora el panel de tiempo permanece en la parte superior de la pantalla durante la pregunta, con segundos grandes, barra proporcional y aviso textual en los últimos cinco segundos. El aviso se anuncia una vez al cambiar de estado, sin leer cada segundo.

Se han pasado 18 pruebas unitarias, lint y build; 20 recorridos existentes de juego e idiomas y cuatro pruebas nuevas de visibilidad y accesibilidad en escritorio y perfil iPhone 13. Se comprobaron ambos capítulos, ES/EN, conservación de los cinco segundos al cambiar idioma, retirada del reloj al responder, nueva cuenta de veinte segundos y tiempo agotado. La auditoría automática del panel no detectó infracciones.

La medición sigue dando Game 1 → 1, QuestionCard 1 → 1 y Timer 1 → 4 durante tres segundos. Capturas móviles: [dos opciones](screenshots/reloj-voices-mobile.jpg) y [cuatro opciones](screenshots/reloj-works-mobile.jpg).

## Conservación de puntuación durante la sesión

Comprobado contra producción en escritorio y perfil iPhone 13: tras acertar la primera pregunta se conservan los 100 puntos, el fragmento 2 y su texto al visitar instrucciones, archivo y cuaderno, volver al inicio y retomar la partida. El cambio a inglés mantiene la misma puntuación y pregunta. Recargar deja la sesión vacía, conforme al almacenamiento solo en React. Dos pruebas nuevas correctas.

Los contextos permanecen por encima de las rutas. No se han añadido cookies, caché ni almacenamiento persistente. Abandonar la partida reinicia el marcador; empezar otra sustituye la actual. Los resultados de partidas terminadas se registran en el cuaderno de la sesión.
