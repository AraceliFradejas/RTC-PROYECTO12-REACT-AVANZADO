import WorkLinks from '../components/WorkLinks';
import { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNotebook, useNotebookActions } from '../context/NotebookContext';
import { questions, authorNames } from '../data/questions';
import { LocalLink as Link } from '../components/LocalLink';
import SaveButton from '../components/notebook/SaveButton';
import ReadingStamps from '../components/notebook/ReadingStamps';
import '../styles/notebook.css';
export default function Notebook() {
  const { t } = useLanguage();
  const session = useNotebook();
  const dispatch = useNotebookActions();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);
  const works = useMemo(() => questions.filter(question => session.discovered.includes(question.id) &&
    (filter !== 'saved' || session.saved.includes(question.id)) &&
    `${question.work} ${authorNames[question.author]}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())), [session.discovered, session.saved, filter, query]);
  return <section className="notebook-page"><p className="eyebrow">{t('UN ARCHIVO QUE SE PARECE A TI')}</p><h1 tabIndex={-1}>{t('Mi cuaderno')}<em>.</em></h1><p className="lead">{t('Las palabras que encontraste. Las historias que decidiste guardar.')}</p>
    <div className="notebook-summary"><span>{t('{count} de 10 obras descubiertas', { count: session.discovered.length })}</span><span>{t(session.saved.length === 1 ? '1 guardada' : '{count} guardadas', { count: session.saved.length })}</span><span>{t('Solo durante esta sesión')}</span></div>
    <h2 className="sr-only">{t("Mis sellos de lectura")}</h2><ReadingStamps {...session}/>
    <div className="notebook-section-heading"><h2>{t('Mis hallazgos')}</h2><div className="collection-filters" role="group" aria-label={t('Filtrar obras')}><button aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>{t('Descubiertas')}</button><button aria-pressed={filter === 'saved'} onClick={() => setFilter('saved')}>{t('Guardadas')}</button></div></div>
    <label className="notebook-search">{t('Buscar por obra o autor')}<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t('Un título, una voz…')}/></label>
    {works.length ? <div className="discovery-grid">{works.map(question => <article key={question.id} className="discovery-card"><span className="eyebrow">{authorNames[question.author]}</span><h3>{question.work}</h3><p>{t(question.explanation)}</p><SaveButton id={question.id}/><WorkLinks question={question}/></article>)}</div> : <div className="notebook-empty"><span aria-hidden="true">❧</span><h3>{t(session.discovered.length ? 'Aquí todavía no hay una coincidencia.' : 'Todavía hay páginas en blanco.')}</h3><p>{t('Juega un capítulo para descubrir obras. Después podrás guardarlas y encontrarlas aquí.')}</p><Link to="/">{t('Explorar los desafíos')} →</Link></div>}
    <section className="session-history"><h2>{t('Mi recorrido')}</h2><p className="small">{t('Últimas veinte partidas terminadas. Las nuevas lecturas no borran las anteriores.')}</p>
      {session.history.length ? <ol>{session.history.map((item, index) => <li key={item.id}><span className="eyebrow">{String(session.history.length - index).padStart(2, '0')}</span><strong>{t(item.challenge === 'eras' ? 'El hilo de las eras' : item.challenge === 'works' ? 'La obra oculta' : 'Entre dos plumas')}</strong><span>{item.challenge === 'eras' ? t('Comprobaciones: {count}', { count: item.checks }) : `${item.score} ${t('puntos')} · ${item.correct}/${item.total}`}</span></li>)}</ol> : <p>{t('Tu primera partida terminada aparecerá aquí.')}</p>}
    </section><div className="notebook-clear">{confirmClear ? <><p>{t('Se borrarán los hallazgos, favoritos, sellos e historial. La partida actual se conserva.')}</p><button className="button button-outline" onClick={() => { dispatch({ type: 'CLEAR' }); setConfirmClear(false); }}>{t('Sí, vaciar mi cuaderno')}</button><button className="text-button" onClick={() => setConfirmClear(false)}>{t('Cancelar')}</button></> : <button className="text-button" disabled={!session.discovered.length && !session.history.length} onClick={() => setConfirmClear(true)}>{t('Vaciar mi cuaderno')}</button>}</div>
  </section>;
}
