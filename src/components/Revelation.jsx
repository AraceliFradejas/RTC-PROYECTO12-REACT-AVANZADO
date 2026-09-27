import { useFocus } from '../hooks/useFocus';
import { authorNames } from '../data/questions';
export default function Revelation({ question, answer, onNext, last }) {
  const heading = useFocus(question.id);
  return <section className="revelation" aria-labelledby="reveal-heading">
    <div><span className="eyebrow">{answer.correct ? 'UNA BUENA LECTURA' : 'UNA NUEVA HISTORIA'}</span>
      <h2 id="reveal-heading" ref={heading} tabIndex={-1}>{answer.correct ? 'Has acertado.' : answer.author === null ? 'Se acabó el tiempo.' : 'Esta vez, era otra pluma.'}</h2>
      <p><strong>{authorNames[question.author]}</strong> · <cite>{question.work}</cite></p>
      <p>{question.explanation}</p><p className="credits">{question.credits}</p>
      <a href={question.source} target="_blank" rel="noreferrer">Consultar la fuente <span aria-hidden="true">↗</span></a>
    </div><button className="button" onClick={onNext}>{last ? 'Leer mi resultado' : 'Siguiente fragmento'} <span aria-hidden="true">→</span></button>
  </section>;
}
