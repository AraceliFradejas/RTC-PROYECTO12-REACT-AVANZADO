import { useLanguage } from '../context/LanguageContext';
import { memo } from 'react';
import { useFocus } from '../hooks/useFocus';
function QuestionCard({ question, number, hinted }) {
  const { t } = useLanguage();
  const heading = useFocus(question.id);
  return <section className="question-card" aria-labelledby="question-heading">
    <span className="eyebrow">{t("MANUSCRITO N.º ")}{String(number).padStart(2, '0')}</span>
    <h1 id="question-heading" ref={heading} tabIndex={-1}>{t("¿Quién escribió estas palabras?")}</h1>
    <blockquote lang="en">“{question.quote}”</blockquote>
    {hinted && <p className="hint-text">{t("Pista: ")}{t(question.hint)}</p>}
  </section>;
}
export default memo(QuestionCard);
