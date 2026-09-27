import { useLanguage } from '../../context/LanguageContext';
import { authorNames } from '../../data/questions';
import { LocalLink as Link } from '../LocalLink';
import SaveButton from './SaveButton';
import WorkLinks from '../WorkLinks';

export default function Discoveries({ works, hasDiscoveries }) {
  const { t } = useLanguage();
  if (!works.length) {
    return (
      <div className="notebook-empty">
        <span aria-hidden="true">❧</span>
        <h3>
          {t(
            hasDiscoveries
              ? 'Aquí todavía no hay una coincidencia.'
              : 'Todavía hay páginas en blanco.',
          )}
        </h3>
        <p>
          {t(
            'Juega un capítulo para descubrir obras. Después podrás guardarlas y encontrarlas aquí.',
          )}
        </p>
        <Link to="/">{t('Explorar los desafíos')} →</Link>
      </div>
    );
  }
  return (
    <div className="discovery-grid">
      {works.map((question) => (
        <article key={question.id} className="discovery-card">
          <span className="eyebrow">{authorNames[question.author]}</span>
          <h3>{question.work}</h3>
          <p>{t(question.explanation)}</p>
          <SaveButton id={question.id} />
          <WorkLinks question={question} />
        </article>
      ))}
    </div>
  );
}
