import { useEffect } from 'react';
import { useNotebookActions } from '../context/NotebookContext';
import { useLanguage } from '../context/LanguageContext';
import { LocalLink as Link } from './LocalLink';
export default function ReaderPortrait({ state, correct }) {
  const { t } = useLanguage();
  const dispatch = useNotebookActions();
  const accuracy = Math.round(correct / state.questions.length * 100);
  const title = accuracy === 100 ? 'Una lectura impecable' : accuracy >= 70 ? 'Una mirada afinada' : 'Una curiosidad que crece';
  useEffect(() => {
    dispatch({ type: 'RECORD', result: { id: `quiz-${state.round}`, challenge: state.challenge, correct, total: state.questions.length, score: state.score, streak: state.bestStreak } });
  }, [dispatch, state.round, state.challenge, state.score, state.bestStreak, state.questions.length, correct]);
  return <div className="reader-portrait"><div className="accuracy-seal" style={{ '--accuracy': `${accuracy}%` }}><span>{accuracy}<small>%</small></span><span className="sr-only">{t('de aciertos')}</span></div><div><span className="eyebrow">{t('TU SELLO DE LECTURA')}</span><h2>{t(title)}</h2><p>{t('Cada lectura cuenta. Esta partida ya forma parte de tu cuaderno.')}</p><Link to="/cuaderno">{t('Ver mi recorrido')} ↗</Link></div></div>;
}
