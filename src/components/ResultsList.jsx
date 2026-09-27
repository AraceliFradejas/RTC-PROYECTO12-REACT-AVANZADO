import { authorNames } from '../data/questions';
export default function ResultsList({ questions, answers }) {
  return <ol className="results-list">{answers.map((answer, index) => {
    const question = questions.find(item => item.id === answer.id);
    return <li key={answer.id}><span className="result-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{question.work}</h3><p>{authorNames[question.author]} · {answer.correct ? 'Acierto' : answer.author === null ? 'Tiempo agotado' : `Elegiste ${authorNames[answer.author]}`}{answer.hinted ? ' · Con pista' : ''}</p><details><summary>Leer el contexto y la fuente</summary><p>{question.explanation}</p><p>{question.credits}</p><a href={question.source} target="_blank" rel="noreferrer">Consultar la fuente ↗</a></details></div><span className="result-points">{answer.correct ? '✓' : '—'} {answer.points} <span className="sr-only">puntos</span></span></li>;
  })}</ol>;
}
