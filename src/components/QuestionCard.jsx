import { memo } from 'react';
import { useFocus } from '../hooks/useFocus';
function QuestionCard({ question, number, hinted }) {
  const heading = useFocus(question.id);
  return <section className="question-card" aria-labelledby="question-heading">
    <span className="eyebrow">MANUSCRITO N.º {String(number).padStart(2, '0')}</span>
    <h1 id="question-heading" ref={heading} tabIndex={-1}>¿Quién escribió estas palabras?</h1>
    <blockquote lang="en">“{question.quote}”</blockquote>
    {hinted && <p className="hint-text">Pista: {question.hint}</p>}
  </section>;
}
export default memo(QuestionCard);
