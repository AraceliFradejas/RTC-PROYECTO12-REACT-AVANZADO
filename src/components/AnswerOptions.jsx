import { useLanguage } from '../context/LanguageContext';
const authors = [
  ['taylor', '01', 'Taylor Swift', 'La voz de una generación'],
  ['shakespeare', '02', 'William Shakespeare', 'La pluma de un siglo'],
];
export default function AnswerOptions({ question, onAnswer, disabled }) {
  const { t } = useLanguage();
  const choices =
    question.choices?.map((choice, index) => [
      choice.id,
      String(index + 1).padStart(2, '0'),
      choice.label,
      'Una obra del archivo',
    ]) || authors;
  return (
    <div
      className="answer-options"
      role="group"
      aria-label={t('Elige la procedencia del fragmento')}
    >
      {choices.map(([id, number, name, description]) => (
        <button
          key={id}
          className="answer-option"
          disabled={disabled}
          onClick={() => onAnswer(question.id, id)}
        >
          <span className="eyebrow">{number}</span>
          <span>
            <strong>{name}</strong>
            <small>{t(description)}</small>
          </span>
          <span aria-hidden="true">↗</span>
        </button>
      ))}
    </div>
  );
}
