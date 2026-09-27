import { useLanguage } from '../context/LanguageContext';
import { LocalLink as Link } from '../components/LocalLink';
import { Navigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import QuestionCard from '../components/QuestionCard';
import AnswerOptions from '../components/AnswerOptions';
import Revelation from '../components/Revelation';
import Timer from '../components/Timer';
import EmptyState from '../components/EmptyState';
import '../styles/game.css';
export default function Game() {
  const { t, path: localPath } = useLanguage();
  const { state, answer, hint, next, reset } = useGame();
  if (state.phase === 'idle') return <EmptyState title="Tu historia aún no ha empezado." />;
  if (state.phase === 'finished') return <Navigate to={localPath('/resultados')} replace />;
  const question = state.questions[state.index];
  const revealed = state.phase === 'reveal';
  return <div className="game-page">
    <div className="game-topline"><Link to="/" onClick={reset}>{t("← Abandonar partida")}</Link><span className="eyebrow">{state.mode === 'calm' ? t("LECTURA SIN PRISA") : t("A CONTRARRELOJ")}</span></div>
    <div className="game-toolbar"><span>{t("Fragmento ")}{state.index + 1} <span className="muted">/ {state.questions.length}</span></span><span>{state.score}{t(" puntos")}</span>{state.mode === 'timed' && !revealed && <Timer key={`${state.round}-${question.id}`} deadline={state.deadline} questionId={question.id} onAnswer={answer} />}</div>
    <progress value={state.answers.length} max={state.questions.length} aria-label={t("Fragmentos respondidos")} />
    <QuestionCard question={question} number={state.index + 1} hinted={state.hinted} />
    {!revealed ? <><AnswerOptions question={question} onAnswer={answer} /><div className="hint-row"><button className="text-button" onClick={hint} disabled={state.hinted || !state.hintsLeft}>{state.hinted ? t("Pista abierta · este acierto vale 50 puntos") : t('Abrir una pista ({count} disponibles)', { count: state.hintsLeft })}</button><span className="small">{t("Acierto sin pista: 100 puntos")}</span></div></> : <Revelation question={question} answer={state.answers.at(-1)} onNext={next} last={state.index === state.questions.length - 1} />}
  </div>;
}
