import WorkLinks from './WorkLinks';
import { useLanguage } from '../context/LanguageContext';
import { authorNames } from '../data/questions';
export default function ResultsList({ questions, answers }) {
  const { t } = useLanguage();
  return (
    <ol className="results-list">
      {answers.map((answer, index) => {
        const question = questions.find((item) => item.id === answer.id);
        return (
          <li key={answer.id}>
            <span className="result-number">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{question.work}</h3>
              <p>
                {authorNames[question.author]} ·{' '}
                {answer.correct
                  ? t('Acierto')
                  : answer.author === null
                    ? t('Tiempo agotado')
                    : t('Elegiste {author}', {
                        author:
                          question.choices?.find((choice) => choice.id === answer.author)?.label ||
                          authorNames[answer.author],
                      })}
                {answer.hinted ? t(' · Con pista') : ''}
              </p>
              <details>
                <summary>{t('Leer el contexto y la fuente')}</summary>
                <p>{t(question.explanation)}</p>
                <p>{t(question.credits)}</p>
                <WorkLinks question={question} />
              </details>
            </div>
            <span className="result-points">
              {answer.correct ? '✓' : '—'} {answer.points}{' '}
              <span className="sr-only">{t('puntos')}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
