import { useLanguage } from '../context/LanguageContext';
import { useFocus } from '../hooks/useFocus';
import { authorNames } from '../data/questions';
export default function Revelation({ question, answer, onNext, last }) {
  const { t } = useLanguage();
  const heading = useFocus(question.id);
  return <section className="revelation" aria-labelledby="reveal-heading">
    <div><span className="eyebrow">{answer.correct ? t("UNA BUENA LECTURA") : t("UNA NUEVA HISTORIA")}</span>
      <h2 id="reveal-heading" ref={heading} tabIndex={-1}>{answer.correct ? t("Has acertado.") : answer.author === null ? t("Se acabó el tiempo.") : t("Esta vez, era otra pluma.")}</h2>
      <p><strong>{authorNames[question.author]}</strong> · <cite>{question.work}</cite></p>
      <p>{t(question.explanation)}</p><p className="credits">{t(question.credits)}</p>
      <a href={question.source} target="_blank" rel="noreferrer">{t("Consultar la fuente ")}<span aria-hidden="true">↗</span></a>
    </div><button className="button" onClick={onNext}>{last ? t("Leer mi resultado") : t("Siguiente fragmento")} <span aria-hidden="true">→</span></button>
  </section>;
}
