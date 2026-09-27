import { useLanguage } from '../context/LanguageContext';
export default function ReadingProgress({ state }) {
  const { t } = useLanguage();
  return (
    <div className="reading-progress" aria-label={t('Mapa de la partida')}>
      {state.questions.map((question, index) => (
        <span
          key={question.id}
          className={
            index === state.index
              ? 'current'
              : state.answers[index]?.correct
                ? 'correct'
                : state.answers[index]
                  ? 'missed'
                  : ''
          }
          aria-label={t('Fragmento {number}: {status}', {
            number: index + 1,
            status: t(
              index === state.index
                ? 'actual'
                : state.answers[index]?.correct
                  ? 'acierto'
                  : state.answers[index]
                    ? 'error'
                    : 'pendiente',
            ),
          })}
        >
          {state.answers[index]
            ? state.answers[index].correct
              ? '✓'
              : '−'
            : String(index + 1).padStart(2, '0')}
        </span>
      ))}
    </div>
  );
}
