import { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNotebook } from '../context/NotebookContext';
import { questions, authorNames } from '../data/questions';
import ReadingStamps from '../components/notebook/ReadingStamps';
import SessionHistory from '../components/notebook/SessionHistory';
import ClearNotebook from '../components/notebook/ClearNotebook';
import Discoveries from '../components/notebook/Discoveries';
import '../styles/notebook.css';

export default function Notebook() {
  const { t } = useLanguage();
  const session = useNotebook();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const works = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return questions.filter(question => {
      const discovered = session.discovered.includes(question.id);
      const matchesFilter = filter !== 'saved' || session.saved.includes(question.id);
      const searchableText = `${question.work} ${authorNames[question.author]}`.toLocaleLowerCase();
      return discovered && matchesFilter && searchableText.includes(search);
    });
  }, [session.discovered, session.saved, filter, query]);

  return (
    <section className="notebook-page">
      <p className="eyebrow">{t('UN ARCHIVO QUE SE PARECE A TI')}</p>
      <h1 tabIndex={-1}>{t('Mi cuaderno')}<em>.</em></h1>
      <p className="lead">{t('Las palabras que encontraste. Las historias que decidiste guardar.')}</p>
      <div className="notebook-summary">
        <span>{t('{count} de 10 obras descubiertas', { count: session.discovered.length })}</span>
        <span>{t(session.saved.length === 1 ? '1 guardada' : '{count} guardadas', { count: session.saved.length })}</span>
        <span>{t('Solo durante esta sesión')}</span>
      </div>
      <h2 className="sr-only">{t('Mis sellos de lectura')}</h2>
      <ReadingStamps {...session}/>
      <div className="notebook-section-heading">
        <h2>{t('Mis hallazgos')}</h2>
        <div className="collection-filters" role="group" aria-label={t('Filtrar obras')}>
          <button aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>{t('Descubiertas')}</button>
          <button aria-pressed={filter === 'saved'} onClick={() => setFilter('saved')}>{t('Guardadas')}</button>
        </div>
      </div>
      <label className="notebook-search">
        {t('Buscar por obra o autor')}
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t('Un título, una voz…')}/>
      </label>
      <Discoveries works={works} hasDiscoveries={session.discovered.length > 0}/>
      <SessionHistory history={session.history}/>
      <ClearNotebook disabled={!session.discovered.length && !session.history.length}/>
    </section>
  );
}
