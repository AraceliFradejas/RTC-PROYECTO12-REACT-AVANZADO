# Memoria técnica · The Tortured Poets Challenge

## Datos del proyecto

| Dato | Información |
| --- | --- |
| Proyecto | Juego de preguntas sobre Taylor Swift y William Shakespeare |
| Módulo | Frontend · React avanzado |
| Formación | Máster Rock The Code · The Power Tech School |
| Autora | Araceli Fradejas Muñoz |
| Tecnologías | React, react-router-dom, JavaScript, Vite y CSS |
| Repositorio | [RTC-PROYECTO12-REACT-AVANZADO](https://github.com/AraceliFradejas/RTC-PROYECTO12-REACT-AVANZADO) |
| Revisión local | 27 de septiembre de 2026 |
| Web pública | Pendiente de despliegue |

Esta memoria distingue la implementación y las comprobaciones locales de las tareas pendientes de producción. Las capturas proceden de la aplicación, no de un boceto.

## 1. Contexto y motivación

El proyecto parte de mi interés por Taylor Swift y continúa la temática de la discografía del Proyecto 6. En aquella entrega trabajé canciones y álbumes mediante una API REST. Aquí el objetivo cambia: construir una experiencia de juego y practicar la gestión de estados en React.

La pregunta «¿Taylor Swift o Shakespeare?» permite conectar letras contemporáneas y teatro clásico. La estética de The Tortured Poets Department da sentido al papel, la tinta y la composición editorial. El desafío se presenta dentro de The Poets Archive, una identidad propia del proyecto. La segunda versión amplía el recorrido con tres capítulos, una cronología interactiva y un cuaderno de hallazgos.

## 2. Objetivos

La persona que juega debe poder elegir modo, responder diez preguntas, descubrir el origen de cada fragmento, consultar su resultado y volver a las preguntas falladas. El recorrido tiene que funcionar también con teclado y en móvil.

El objetivo técnico es separar las reglas de la presentación y entender qué provoca cada actualización. La entrega se resuelve con estado en React, sin recuperar datos de una base de datos ni escribir en localStorage.

## 3. Requisitos y cumplimiento

| Requisito | Implementación | Comprobación |
| --- | --- | --- |
| Responsive | Grid, Flex, tamaños fluidos y media queries en los estilos que corresponden | Capturas y pruebas en escritorio y móvil |
| CSS y HTML | Variables, estilos por responsabilidad, landmarks, encabezados y controles nativos | Lint y revisión con axe |
| react-router-dom | Seis recorridos, contando ruta desconocida | Acceso directo, navegación y recarga |
| Custom hook | useGame, useCountdown y useFocus | Partida, reloj y movimientos de foco |
| useReducer | Transiciones START, HINT, ANSWER, NEXT y RESET | Pruebas de reglas y casos límite |
| Evitar renderizados innecesarios | Reloj con estado local, callbacks estables y tarjeta memorizada | Medición específica del reloj |
| Componentes correctos | Pantallas que componen pregunta, opciones, revelación, resultados y layout | Código y recorridos completos |

No se promete que ningún componente vuelva a renderizarse: las respuestas y las pistas deben cambiar la pantalla. Se comprueba el caso costoso del reloj y se evita memorizar cálculos triviales sin necesidad.

## 4. Tecnologías y decisiones

React compone la interfaz y react-router-dom conserva la navegación de la aplicación. Vite prepara el desarrollo y la compilación. El CSS se divide en base, layout, portada, juego y páginas de lectura. No hay archivos vacíos ni versiones móvil/escritorio desconectadas.

React Hook Form se ha consultado como recurso. El formulario actual contiene dos opciones de modo y un botón; los controles nativos y un estado local son suficientes. No se instala una dependencia que no se necesita.

Vitest prueba las reglas sin navegador. Playwright recorre la aplicación compilada. axe-core detecta incidencias automáticas de accesibilidad. Esas pruebas no sustituyen una evaluación con personas usuarias o tecnologías de apoyo.

## 5. Arquitectura

`GameProvider` conserva la partida por encima de las rutas. Estado y dispatch tienen contextos separados. `useGame` expone acciones mediante callbacks estables; las pantallas no modifican el estado directamente.

`gameReducer` contiene las transiciones y no genera fechas ni números aleatorios: recibe las preguntas mezcladas y la hora como datos de las acciones. Esto permite probar una partida de forma determinista. `shuffle` mezcla una copia con Fisher–Yates.

El catálogo está separado del motor. Cada pregunta incluye identificador, fragmento, procedencia, obra, colección, pista, explicación, créditos y fuente. No se importa la semilla entera del Proyecto 6: se conserva la conexión temática con un catálogo pequeño y revisado.

## 6. Flujo de la aplicación

```text
Inicio → seleccionar modo → pregunta
                             ├─ pista opcional
                             ├─ responder o agotar el tiempo
                             ↓
                         revelación
                             ├─ siguiente pregunta
                             └─ última pregunta → resultados
                                                   ├─ nueva partida
                                                   ├─ repasar errores
                                                   └─ borrar y salir
```

La partida utiliza cuatro fases: `idle`, `question`, `reveal` y `finished`. Solo `question` acepta respuestas y pistas. Solo `reveal` permite avanzar. Una segunda respuesta no suma puntos y un evento de otra pregunta se ignora.

Acierto sin pista: 100 puntos. Con pista: 50. Error o tiempo agotado: cero. La racha crece con los aciertos y se reinicia al fallar, conservando el mejor valor. El repaso crea una partida nueva con las preguntas falladas, tres pistas y modo tranquilo.

### Tres capítulos y un cuaderno

`buildRound` prepara el capítulo de voces o el de obras. En el segundo genera cuatro opciones distintas de la misma procedencia e incluye exactamente una correcta. El reducer valida las respuestas contra esas opciones. El repaso mantiene el capítulo y vuelve a preparar sus alternativas.

La cronología cuenta con su propio reducer: preparar selección, mover una posición, comprobar y reiniciar. Se eligen seis álbumes entre diez; no se entrega una selección ya ordenada. No hay arrastre obligatorio: los botones funcionan con ratón, teclado y móvil. Los años se muestran tras acertar. La selección se conserva al navegar y al cambiar de idioma.

El cuaderno tiene estado separado de la partida. Descubrir una obra y registrar una partida son operaciones idempotentes, por lo que StrictMode o volver a resultados no los duplica. Permite guardar y quitar favoritos, buscar por obra o autor, consultar hasta veinte partidas y vaciar el contenido con confirmación. Los sellos se derivan de acciones reales. Todos los datos desaparecen al recargar.

La lista de hallazgos se deriva mediante `useMemo` a partir de descubrimientos, favoritos, filtro y búsqueda. El historial puede cambiar sin repetir ese filtrado. No se almacena una segunda copia de la lista.

## 7. Temporizador y renderizados

`useCountdown` mantiene los segundos únicamente dentro de `Timer`. Se utiliza una fecha límite en lugar de restar uno en cada intervalo; así se tiene en cuenta el tiempo real cuando una pestaña queda en segundo plano. El efecto limpia el intervalo y el listener de visibilidad al desmontarse.

La fecha límite se conserva en la partida. Navegar a las instrucciones no la reinicia. Al regresar, una pregunta vencida se revela como tiempo agotado. El reducer también comprueba el plazo al recibir una respuesta para cubrir el instante entre dos actualizaciones del reloj.

`QuestionCard` recibe datos y propiedades estables y se memoriza con `memo`. Pedir una pista sí cambia su contenido. Responder actualiza las zonas necesarias. No se añade useMemo para contar diez respuestas porque no hay un cálculo costoso que lo justifique.

La medición reproducible está en `npm run check:renders`; los resultados y el alcance se recogen en [Validación](docs/VALIDACION.md). StrictMode se mantiene activo durante desarrollo.

## 8. Diseño y accesibilidad

La portada mezcla tipografía con serif para la lectura, monoespaciada para etiquetas y una sans serif para controles. La portada utiliza una escena editorial generada específicamente para el proyecto y optimizada a JPEG de unos 288 KB. No representa un lugar real ni utiliza fotografías oficiales de la artista. Los discos, sellos y el cuaderno se dibujan con CSS. No se descargan fuentes externas. [Recurso y prompt](docs/RECURSOS.md).

Las opciones de modo son radios dentro de un fieldset con legend. Las respuestas son botones. Las fuentes son enlaces. Las citas se marcan como blockquote y su idioma se identifica en inglés. La jerarquía utiliza un h1 por pantalla.

Se proporciona foco visible, enlace para saltar al contenido, foco al cambiar de pregunta y al mostrar la revelación. La cuenta atrás no interrumpe la lectura cada segundo. El modo sin prisa permite utilizar la experiencia sin un límite de tiempo. Las transiciones se desactivan cuando se solicita movimiento reducido.

### Versiones en castellano e inglés británico

El selector ES/EN cambia entre rutas equivalentes sin recargar. `LanguageProvider` obtiene el idioma de la URL y proporciona traducciones y enlaces localizados; `GameProvider` conserva la misma partida. No se utilizan mecanismos de almacenamiento para recordar el idioma: la propia dirección permite volver a la versión elegida.

Se traducen portada, navegación, reglas, archivo, pistas, explicaciones, créditos, estados, resultados, etiquetas accesibles y footer. Los fragmentos literarios y los títulos de obras conservan su texto original. La variante de la interfaz inglesa es `en-GB`, sin modernizar los textos de Shakespeare.

El footer sigue la estructura académica de KelseTS Talks: autoría, referencia al máster Rock The Code, enlace a The Power Tech School y aviso educativo y de ausencia de afiliación. Solo muestra el idioma seleccionado.

## 9. SEO y acceso para asistentes

El build renderiza la misma aplicación React a HTML para que portada, reglas y fuentes puedan leerse sin ejecutar JavaScript. Después React hidrata ese contenido y añade el juego. La página de partida no incluye preguntas abiertas en su HTML inicial porque no existe una sesión al solicitarla.

Los metadatos se definen por ruta e idioma. El build genera dieciséis páginas HTML, contando los estados vacíos y las páginas 404 de ambas versiones. Se actualizan `lang`, `og:locale` y los datos estructurados; con dominio configurado se incluyen canónicas y alternativas `hreflang`. Hay descripción, autoría, Open Graph, Twitter Card y datos estructurados WebApplication coherentes con la aplicación visible. Se excluyen de indexación partida, resultados y página 404. No se inventan valoraciones, estadísticas ni afiliaciones.

`llms.txt` resume el propósito y enlaza las fuentes. Es un recurso informativo, no una garantía de posicionamiento. Las canónicas y el sitemap solo se generan cuando se proporciona `SITE_URL`, para no publicar direcciones ficticias. Queda pendiente configurar el dominio real y revisar la respuesta del alojamiento.

## 10. Correcciones anteriores aplicadas

| Observación del profesorado | Aplicación en esta entrega |
| --- | --- |
| Archivos vacíos o sin uso | Solo se incorporan módulos y recursos utilizados |
| Imágenes demasiado pesadas | Un único JPEG optimizado y utilizado en portada; CSS y SVG para el resto, capturas fuera del bundle |
| Falta de metadatos | Metadatos por ruta y HTML prerenderizado |
| Poca componentización | Pregunta, opciones, reloj, revelación y resultados separados |
| CSS demasiado extenso | Estilos distribuidos por responsabilidad |
| Mezcla de estrategias para crear DOM | JSX en los componentes; las reglas no manipulan DOM |
| Falta de reinicio en algún juego | Nueva partida, repaso, abandono y borrado de resultado |
| Textos de ambos idiomas simultáneos | Selector ES/EN; solo aparece el idioma elegido y se identifican las citas originales |
| Funciones exportadas sin uso | Revisión con lint y estructura reducida |
| Mensaje de turno al terminar | Fases explícitas; se ocultan las opciones y el reloj al responder |
| Datos duplicados en la semilla | Prueba de unicidad de identificadores, obras y fragmentos |
| Respuestas de controladores inconsistentes | No hay API en esta entrega; las transiciones se centralizan |

## 11. Pruebas y evidencias

Las pruebas cubren el doble clic, las pistas, el fin de partida, la racha, el vencimiento del reloj, la navegación fuera de la partida, la recarga, el repaso de un error y el borrado del resultado. También se comprueban rutas directas, HTML sin JavaScript, foco y anchura.

[Resultados reproducibles](docs/VALIDACION.md) · [Captura de escritorio](docs/screenshots/inicio-desktop.jpg) · [Captura móvil](docs/screenshots/inicio-mobile.jpg).

## 12. Límites y siguientes pasos

Los capítulos de voces y obras comparten diez fragmentos: cambia el orden y, en el de obras, la selección de alternativas. La cronología varía las seis piezas escogidas entre diez álbumes. El juego necesita comprensión de inglés. No hay audio, historial persistente, cuentas ni clasificación global; el historial del cuaderno solo existe durante la sesión. La prueba móvil se realiza en Chromium con un viewport móvil, no en un iPhone físico ni en Safari.

La siguiente revisión debe validar el diseño y la selección de preguntas con uso real. Después se puede ampliar el catálogo con nuevas fuentes, configurar el dominio y publicar. Una futura evolución full stack tendría su alcance propio; esta entrega no introduce esa infraestructura.

## 13. Fuentes y autoría

Las fuentes de cada pregunta aparecen en `src/data/questions.js` y en la página del archivo. Para las canciones se consultan recursos oficiales de Taylor Swift; para Shakespeare, Folger Shakespeare Library. Las explicaciones son comentarios del proyecto y no declaraciones de las personas citadas.

Referencias técnicas: [useReducer](https://react.dev/reference/react/useReducer), [React Router](https://reactrouter.com/start/declarative/installation) y [React Hook Form](https://www.react-hook-form.com/).

**Araceli Fradejas Muñoz** · Rock The Code · The Power Tech School.

## Revisión de enlaces

He revisado las referencias para que se pueda continuar desde el juego hasta la obra. Las canciones tienen enlaces directos a Apple Music y Spotify, además de su vídeo oficial con letra. En el Proyecto 6 utilizaba búsquedas por título; aquí el catálogo pequeño permite guardar la URL de cada pista. Para Shakespeare, el enlace abre la escena de Folger en la línea del fragmento.

El componente `WorkLinks` comparte estas opciones entre archivo, revelación, resultados y cuaderno. JetPunk y TriviaCreator figuran como referencias del formato, separadas de las fuentes de las preguntas. La comprobación y sus límites están en [la revisión de enlaces](docs/ENLACES.md).
