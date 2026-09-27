# The Tortured Poets Challenge

Proyecto de **React avanzado** del máster **Rock The Code** de [The Power Tech School](https://thepower.education/thepowermba/tech).

**¿Taylor Swift o Shakespeare?** Diez fragmentos, dos universos y una pequeña biblioteca para descubrir la historia detrás de cada respuesta.

[Versión en castellano](#the-tortured-poets-challenge) · [English version](#english-version)

[Jugar en la web](https://the-poets-archive.vercel.app) · [Play in English](https://the-poets-archive.vercel.app/en)

[Memoria técnica](MEMORIA.md) · [Revisión del enunciado](docs/REVISION-ENTREGA.md) · [Pruebas y accesibilidad](docs/VALIDACION.md) · [Despliegue](docs/DESPLIEGUE.md)

![Portada del juego en escritorio](docs/screenshots/inicio-desktop.jpg)

## Contenido

- [Una historia personal](#una-historia-personal)
- [Estado actual](#estado-actual)
- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Instalación local](#instalación-local)
- [Estructura](#estructura)
- [Accesibilidad y descubrimiento](#accesibilidad-y-descubrimiento)
- [Aviso académico y autoría](#aviso-académico-y-autoría)

## Una historia personal

Después de trabajar con la discografía de Taylor Swift en el [Proyecto 6](https://github.com/AraceliFradejas/RTC-PROYECTO6-API-REST), quería volver a ese universo desde otro lugar. Esta vez las canciones se convierten en un juego de lectura: reconocer una voz, equivocarse y descubrir una obra.

La idea une música y literatura con una estética inspirada en *The Tortured Poets Department*: papel, tinta, tonos marfil y una composición que recuerda a un pequeño archivo. La identidad del juego, **The Poets Archive**, acompaña al desafío sin utilizar el logotipo del álbum.

## Estado actual

Versión ampliada, publicada en Vercel y comprobada en local. Incluye tres capítulos: **Entre dos plumas**, **La obra oculta** y **El hilo de las eras**. Los dos primeros comparten diez fragmentos —cinco canciones y cinco obras de teatro—, con dos o cuatro opciones respectivamente. La cronología selecciona seis álbumes de un catálogo histórico de diez.

No hay backend, cuentas ni almacenamiento persistente. El estado vive en React: se mantiene al navegar dentro de la aplicación y se pierde al recargar. Web pública: [The Poets Archive](https://the-poets-archive.vercel.app).

## Funcionalidades

- **Entre dos plumas:** reconocer la procedencia de cada fragmento.
- **La obra oculta:** reconocer el título entre cuatro obras de la misma procedencia.
- **El hilo de las eras:** ordenar seis álbumes mediante controles accesibles, comprobar el orden y descubrir sus años.
- **Mi cuaderno:** hallazgos, favoritos, buscador, sellos y las últimas veinte partidas de la sesión.
- Portada editorial con una escena original generada para el proyecto, optimizada a unos 288 KB. [Recurso y procedencia](docs/RECURSOS.md).

- Modo **sin prisa**, sin límite de tiempo.
- Modo **a contrarreloj**, con veinte segundos por fragmento.
- Tres pistas por ronda, como máximo una por pregunta.
- 100 puntos por acierto; 50 si se ha utilizado pista; cero por error o tiempo agotado.
- Revelación de la obra, créditos de composición, explicación y enlace a la fuente.
- Resultados con aciertos, mejor racha, pistas y revisión de respuestas.
- Segunda lectura de los errores, sin reloj y con marcador nuevo.
- Nueva partida, abandono y borrado del resultado desde la interfaz.
- Portada, instrucciones, archivo, partida, resultados y pantalla de ruta desconocida.

La interfaz está disponible en **castellano e inglés británico**, con selector **ES/EN**. Cada versión tiene sus propias rutas: `/` y `/en`. El idioma se conserva al navegar y cambiarlo no borra la partida, las pistas ni el plazo del reloj. Los fragmentos conservan su inglés original y se identifican con `lang="en"`. «Taylor Swift» indica la procedencia de una canción de su repertorio; los créditos identifican también las coautorías musicales.

## Tecnologías

React, **react-router-dom**, Vite y CSS. `useReducer` organiza la partida; `useGame`, `useCountdown` y `useFocus` encapsulan lógica reutilizable. Vitest prueba las reglas; Playwright y axe-core comprueban recorridos y accesibilidad.

Se ha revisado [React Hook Form](https://www.react-hook-form.com/). No se utiliza: este juego solo necesita un selector nativo de modo. Añadir una biblioteca de formularios no resuelve una necesidad de esta versión.

## Instalación local

Requisito: **Node.js 22.12 o posterior**.

```bash
git clone https://github.com/AraceliFradejas/RTC-PROYECTO12-REACT-AVANZADO.git
cd RTC-PROYECTO12-REACT-AVANZADO
npm ci
npm run dev
```

Abrir `http://127.0.0.1:5173`. No se necesitan claves, servicios externos ni variables para jugar.

```bash
npm run lint           # Revisión de JavaScript y reglas de hooks
npm test               # Reglas y coherencia del catálogo
npm run build          # Compilación y HTML prerenderizado
npm run preview        # Revisar el resultado de producción
npm run test:e2e       # Recorridos en escritorio y móvil; genera capturas
npm run check:renders  # Medición del reloj con React en desarrollo
```

Las pruebas de navegador utilizan Chrome si está instalado en su ubicación habitual de macOS. En otros entornos, ejecutar primero `npx playwright install chromium`.

## Estructura

```text
src/
  components/   # Presentación compartida, reloj, pregunta y revelación
  context/      # Estado de sesión y dispatch separados
  data/         # Catálogo con identificadores, créditos y fuentes
  game/         # Reducer puro y mezcla de preguntas
  hooks/        # Partida, temporizador y foco
  i18n/         # Traducciones al inglés británico y rutas por idioma
  pages/        # Pantallas de la aplicación
  seo/          # Metadatos y renderizado a HTML
  styles/       # Base, estructura, portada, juego y lectura
scripts/        # Prerenderizado y medición de renderizados
tests/          # Reglas, recorridos y accesibilidad
docs/           # Memoria de comprobaciones y capturas reales
```

## Accesibilidad y descubrimiento

HTML semántico, navegación con teclado, enlace para saltar al contenido, foco al cambiar de pregunta y al revelar la respuesta, señales que no dependen solo del color y respeto por movimiento reducido. El reloj no anuncia cada segundo mediante una región viva; la revelación recibe el foco al agotarse el tiempo.

La compilación entrega HTML con contenido para las rutas, descripciones, títulos, Open Graph, Twitter Card, datos estructurados `WebApplication`, `robots.txt` y un archivo informativo `llms.txt`. Con `SITE_URL` configurada también genera canónicas, alternativas `hreflang` ES/EN y sitemap con las dos versiones. Partida, resultados y página 404 llevan `noindex`.

Estas medidas facilitan el acceso al contenido. No garantizan posiciones en buscadores ni menciones de asistentes. [Alcance de la revisión](docs/VALIDACION.md).

## Aviso académico y autoría

Proyecto educativo e independiente, sin afiliación, autorización ni patrocinio de Taylor Swift o sus representantes. Las obras y sus derechos pertenecen a sus respectivos titulares. Se muestran fragmentos breves con atribución; no se incorporan grabaciones, letras completas ni imágenes oficiales. La composición combina CSS, un favicon SVG propio y una escena editorial generada para el proyecto. Su procedencia y prompt están en [Recursos](docs/RECURSOS.md).

**Araceli Fradejas Muñoz** · Rock The Code · The Power Tech School.

[GitHub](https://github.com/AraceliFradejas) · [LinkedIn](https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/)


## English version

**The Tortured Poets Challenge** is an educational Advanced React project for the **Rock The Code master’s programme at [The Power Tech School](https://thepower.education/thepowermba/tech)**, created by **Araceli Fradejas Muñoz**.

Taylor Swift or Shakespeare? Read ten brief excerpts, choose their source and discover the work behind each answer. The visual style takes inspiration from the paper, ink and intimate atmosphere of *The Tortured Poets Department*.

### Features and languages

- Three chapters: identify the voice, identify the work from four choices, or arrange six albums chronologically.
- A session notebook with discoveries, favourites, reading stamps and the last twenty completed games.
- Complete Spanish and British English interfaces, with an ES/EN selector.
- Unhurried mode or twenty seconds per question.
- Three hints per round; 100 points per correct answer, or 50 with a hint.
- Sources, songwriting credits and original commentary after every answer.
- A results page and an untimed review of your mistakes.
- Changing language preserves the current game, score, hints and deadline.

The initial catalogue contains five songs and five plays. Their order changes between rounds. The timeline selects six original albums from a historical catalogue of ten (2006–2024). Excerpts remain in their original English. There are no accounts, recordings, complete lyrics or persistent game storage. Refreshing clears the game, whilst the language is retained by the URL.

### Run locally

Use Node.js 22.12 or later. Run `npm ci`, then `npm run dev`. Spanish starts at `http://127.0.0.1:5173/`; British English starts at `http://127.0.0.1:5173/en`.

`npm test` checks rules and translations; `npm run test:e2e` checks browser journeys and accessibility; `npm run check:renders` measures timer updates. Run `npm run build` before checking the production build with `npm run preview`.

Public pages are prerendered in both languages. Set the real deployment origin in `SITE_URL` to generate canonical URLs, language alternatives and the sitemap. Public deployment is still pending; the current evidence is from local testing. See the [technical report in Spanish](MEMORIA.md) and [validation record](docs/VALIDACION.md).

This is an independent, unofficial academic project, with no affiliation to Taylor Swift or her representatives. Quoted works belong to their respective rights holders. The footer links to the school and displays the academic notice in the selected language only.
