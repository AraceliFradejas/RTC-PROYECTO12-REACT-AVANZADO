import { useLanguage } from '../context/LanguageContext';
import { LocalLink as Link } from './LocalLink';
export default function EmptyState({
  title,
  description = 'Elige un modo para abrir el archivo. Los resultados se conservan solo mientras esta página siga abierta.',
}) {
  const { t } = useLanguage();
  return (
    <section className="empty-state">
      <span className="eyebrow">{t('EL ARCHIVO DE POETAS')}</span>
      <h1 tabIndex={-1}>{t(title)}</h1>
      <p>{t(description)}</p>
      <Link to="/" className="button">
        {t('Volver al inicio →')}
      </Link>
    </section>
  );
}
