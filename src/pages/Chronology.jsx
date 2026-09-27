import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNotebookActions } from '../context/NotebookContext';
import { useChronology } from '../hooks/useChronology';
import { LocalLink as Link } from '../components/LocalLink';
import { erasSource } from '../data/eras';
import '../styles/chronology.css';
export default function Chronology() {
  const { t } = useLanguage();
  const { state, start, dispatch } = useChronology();
  const record = useNotebookActions();
  const resultHeading = useRef(null);
  const complete = state.phase === 'finished';
  useEffect(() => {
    if (complete) {
      record({ type: 'RECORD', result: { id: `eras-${state.round}`, challenge: 'eras', correct: 6, total: 6, checks: state.checks } });
      resultHeading.current?.focus();
    }
  }, [complete, record, state.round, state.checks]);
  const sorted = [...state.albums].sort((a, b) => a.year - b.year);
  const placed = state.albums.filter((album, index) => album.id === sorted[index].id).length;
  return <section className="chronology-page"><div className="game-topline"><Link to="/">← {t('El desafío')}</Link><span className="eyebrow">{t('CAPÍTULO')} III / {t('CRONOLOGÍA')}</span></div>
    <p className="eyebrow">{t('EL TIEMPO TAMBIÉN CUENTA HISTORIAS')}</p><h1 tabIndex={-1}>{t('El hilo de las eras')}</h1><p className="lead">{t('Seis álbumes elegidos de un archivo de diez. Sin reloj: ordénalos del más antiguo al más reciente.')}</p>
    {state.phase === 'idle' ? <button className="button" onClick={start}>{t('Preparar mi cronología')} →</button> : <>
      <div className="timeline-heading"><span>{t('MÁS ANTIGUO')}</span><span>{t('Comprobaciones: {count}', { count: state.checks })}</span></div>
      <ol className="era-list">{state.albums.map((album, index) => <li key={album.id} style={{ '--era-colour': album.colour }}>
        <span className="era-number">{String(index + 1).padStart(2, '0')}</span><div className="era-disc" aria-hidden="true"><span/></div><div className="era-title"><h2>{album.title}</h2><span>{complete ? album.year : t('EDICIÓN ORIGINAL')}</span></div>
        {!complete && <div className="era-controls"><button aria-label={t('Subir {album}', { album: album.title })} disabled={index === 0} onClick={() => dispatch({ type: 'MOVE', id: album.id, direction: -1 })}>↑</button><button aria-label={t('Bajar {album}', { album: album.title })} disabled={index === state.albums.length - 1} onClick={() => dispatch({ type: 'MOVE', id: album.id, direction: 1 })}>↓</button></div>}
        {complete && <span className="era-check" aria-label={t('Orden correcto')}>✓</span>}
      </li>)}</ol>
      <span className="eyebrow">{t('MÁS RECIENTE')}</span>
      <div className="timeline-feedback" role="status">{!complete && state.checked && t('Hay {count} de 6 álbumes en su posición. Ajusta el orden y vuelve a comprobar.', { count: placed })}</div>
      {complete ? <div className="timeline-complete"><span className="eyebrow">{t('ARCHIVO RECONSTRUIDO')}</span><h2 ref={resultHeading} tabIndex={-1}>{t('Cada era, en su lugar.')}</h2><p>{t('Has unido seis momentos de una misma historia. El sello de Archivista ya está en tu cuaderno.')}</p><Link to="/cuaderno">{t('Ver mi recorrido')} ↗</Link></div> : <button className="button" onClick={() => dispatch({ type: 'CHECK' })}>{t('Comprobar el orden')} →</button>}
      <div className="timeline-actions"><button className="text-button" onClick={start}>{t('Preparar otra selección')}</button><button className="text-button" onClick={() => dispatch({ type: 'RESET' })}>{t('Borrar cronología')}</button></div>
    </>}
    <p className="small timeline-source">{t('Ordenamos los lanzamientos originales, no las regrabaciones. Selección histórica entre 2006 y 2024.')}{' '}<a href={erasSource} target="_blank" rel="noreferrer">{t('Fuente ↗')}</a></p>
  </section>;
}
