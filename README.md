# The Tortured Poets Challenge

Proyecto de **React avanzado** del máster **Rock The Code** de [The Power Tech School](https://thepower.education/thepowermba/tech).

**¿Taylor Swift o Shakespeare?** Diez fragmentos, dos universos y una pequeña biblioteca para descubrir la historia detrás de cada respuesta.

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

Primera versión funcional, preparada y comprobada en local. Incluye diez preguntas diferentes —cinco canciones y cinco obras de teatro—, dos modos y repaso de errores. El orden cambia en cada partida; el catálogo inicial es siempre el mismo.

No hay backend, cuentas ni almacenamiento persistente. El estado vive en React: se mantiene al navegar dentro de la aplicación y se pierde al recargar. La publicación web y la comprobación del dominio de producción quedan pendientes; no se presenta una demo pública que todavía no existe.

## Funcionalidades

- Modo **sin prisa**, sin límite de tiempo.
- Modo **a contrarreloj**, con veinte segundos por fragmento.
- Tres pistas por ronda, como máximo una por pregunta.
- 100 puntos por acierto; 50 si se ha utilizado pista; cero por error o tiempo agotado.
- Revelación de la obra, créditos de composición, explicación y enlace a la fuente.
- Resultados con aciertos, mejor racha, pistas y revisión de respuestas.
- Segunda lectura de los errores, sin reloj y con marcador nuevo.
- Nueva partida, abandono y borrado del resultado desde la interfaz.
- Portada, instrucciones, archivo, partida, resultados y pantalla de ruta desconocida.

La interfaz está en castellano. Los fragmentos conservan su inglés original y se identifican con `lang="en"`. «Taylor Swift» indica la procedencia de una canción de su repertorio; los créditos identifican también las coautorías musicales.

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
  pages/        # Pantallas de la aplicación
  seo/          # Metadatos y renderizado a HTML
  styles/       # Base, estructura, portada, juego y lectura
scripts/        # Prerenderizado y medición de renderizados
tests/          # Reglas, recorridos y accesibilidad
docs/           # Memoria de comprobaciones y capturas reales
```

## Accesibilidad y descubrimiento

HTML semántico, navegación con teclado, enlace para saltar al contenido, foco al cambiar de pregunta y al revelar la respuesta, señales que no dependen solo del color y respeto por movimiento reducido. El reloj no anuncia cada segundo mediante una región viva; la revelación recibe el foco al agotarse el tiempo.

La compilación entrega HTML con contenido para las rutas, descripciones, títulos, Open Graph, Twitter Card, datos estructurados `WebApplication`, `robots.txt` y un archivo informativo `llms.txt`. Con `SITE_URL` configurada también genera canónicas y sitemap. Partida, resultados y página 404 llevan `noindex`.

Estas medidas facilitan el acceso al contenido. No garantizan posiciones en buscadores ni menciones de asistentes. [Alcance de la revisión](docs/VALIDACION.md).

## Aviso académico y autoría

Proyecto educativo e independiente, sin afiliación, autorización ni patrocinio de Taylor Swift o sus representantes. Las obras y sus derechos pertenecen a sus respectivos titulares. Se muestran fragmentos breves con atribución; no se incorporan grabaciones, letras completas ni imágenes oficiales. La composición visual se realiza con CSS y un favicon SVG propio.

**Araceli Fradejas Muñoz** · Rock The Code · The Power Tech School.

[GitHub](https://github.com/AraceliFradejas) · [LinkedIn](https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/)
