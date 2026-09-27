# Revisión de la entrega · React avanzado

| Requisito | Ubicación | Estado |
| --- | --- | --- |
| Full responsive | `src/styles` y pruebas de anchura | Comprobado en navegador emulado |
| CSS organizado y HTML semántico | Layout, páginas y componentes | Implementado y revisado |
| react-router-dom | `src/App.jsx` y `src/main.jsx` | Implementado |
| Custom hook | `src/hooks/useGame.js` y otros | Implementado |
| useReducer | `src/context/GameContext.jsx`, `src/game/gameReducer.js` | Implementado y probado |
| Renderizados controlados | Timer aislado y QuestionCard memorizada | Medición en `check:renders` |
| Componentes adecuados | `src/components`, `src/pages` | Responsabilidades separadas |
| Estado solo en React | Contextos y hooks | Sin persistencia ni base de datos |
| Versiones ES/EN | Interfaz, pistas, explicaciones, metadatos y rutas propias | Comprobado en ambos idiomas |
| Footer académico | Rock The Code y enlace a The Power Tech School | Visible según el idioma elegido |
| Tres capítulos | Voces, obras y cronología | Recorridos comprobados en escritorio y móvil |
| Cuaderno de lectura | Descubrimientos, favoritos, sellos e historial | Estado de sesión y vaciado comprobados |
| Documentación | README, MEMORIA, validación y recursos | Ampliación documentada con capturas |

## Antes de entregar en el campus

- Revisar personalmente el juego y su memoria para poder explicar las decisiones.
- Completar las revisiones manuales pendientes de la [web publicada](https://the-poets-archive.vercel.app), recogidas en [la guía](DESPLIEGUE.md).
- Repositorio público y cambios subidos: comprobado el 27 de septiembre de 2026.
- Safari de macOS comprobado con el recorrido descrito en [VALIDACION.md](VALIDACION.md). Queda la revisión en móvil físico.
- Pegar el enlace de GitHub en el campo de entrega del campus. Si se modifica después de la revisión, actualizar ese campo, como indicó el profesorado.

La revisión local no equivale a una evaluación del profesorado ni a una garantía de posicionamiento.

## Enlaces y texto de entrega

Hola!

Adjunto el enlace del Proyecto 12 de React avanzado en [GitHub](https://github.com/AraceliFradejas/RTC-PROYECTO12-REACT-AVANZADO) y la [web publicada en Vercel](https://the-poets-archive.vercel.app).

He incluido la memoria en el repositorio con la explicación de los hooks, la organización de los componentes y las pruebas realizadas. El juego está disponible en castellano e inglés.

Quedo a la espera de sus comentarios.

Gracias!

## Repaso para explicar el proyecto

- **¿Por qué useReducer?** Centraliza las transiciones de la partida y evita estados incoherentes: responder dos veces no suma puntos y solo se avanza tras la revelación.
- **¿Qué aporta el custom hook?** `useGame` reúne las acciones del juego para que las páginas no tengan que conocer los detalles de dispatch.
- **¿Cómo se controla el reloj?** Las actualizaciones de los segundos se mantienen en el temporizador; Game y QuestionCard no necesitan renderizarse con cada segundo. La medición concreta está en VALIDACION.md.
- **¿Por qué se pierde el cuaderno al recargar?** Los datos viven en los contextos de React, según el requisito de no usar almacenamiento persistente.
- **¿Cómo se conserva la partida al cambiar idioma?** Los proveedores permanecen por encima de las rutas; cambiar el idioma cambia la presentación sin reconstruir el estado del juego.
- **¿Qué significa SEO/GEO aquí?** HTML editorial, metadatos, enlaces y fuentes accesibles a rastreadores. No implica garantizar posiciones ni apariciones en respuestas de asistentes.

Para la revisión en teléfono físico: abrir la web, cambiar ES/EN, responder, guardar una obra, mover una pieza de cronología y comprobar que los botones y textos se leen sin desplazamiento horizontal.
