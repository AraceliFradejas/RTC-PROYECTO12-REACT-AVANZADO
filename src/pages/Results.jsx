import ReaderPortrait from '../components/ReaderPortrait';
import { useLanguage } from '../context/LanguageContext';
import { LocalLink as Link } from '../components/LocalLink';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import EmptyState from '../components/EmptyState';
import ResultsList from '../components/ResultsList';
import '../styles/game.css';
export default function Results() {
  const { t, path: localPath } = useLanguage();
  const { state, start, reset } = useGame();
  const navigate = useNavigate();
  if (state.phase !== 'finished')
    return (
      <EmptyState
        title="Todavía quedan páginas por leer."
        description="El resultado aparece al terminar una partida. Si hay una en curso, puedes retomarla desde el inicio."
      />
    );
  const correct = state.answers.filter((item) => item.correct).length;
  const missed = state.questions.filter((question) =>
    state.answers.some((answer) => answer.id === question.id && !answer.correct),
  );
  function replay(pool) {
    start(pool ? 'calm' : state.mode, pool, state.challenge);
    navigate(localPath('/partida'));
  }
  return (
    <section className="results-page">
      <p className="eyebrow">{t('EPÍLOGO / TU LECTURA')}</p>
      <h1 tabIndex={-1}>
        {correct === state.questions.length
          ? t('Conoces el alma de las palabras.')
          : t('Cada palabra deja una huella.')}
      </h1>
      <p className="lead">
        {correct === state.questions.length
          ? t('No se te ha escapado ninguna. El archivo guarda pocas sorpresas para ti.')
          : t('Lo bonito de leer es descubrir algo nuevo. Aquí está tu historia.')}
      </p>
      <ReaderPortrait state={state} correct={correct} />
      <dl className="stats">
        <div>
          <dt>{t('Puntuación')}</dt>
          <dd>
            {state.score}
            <small> / {state.questions.length * 100}</small>
          </dd>
        </div>
        <div>
          <dt>{t('Aciertos')}</dt>
          <dd>
            {correct}
            <small> / {state.questions.length}</small>
          </dd>
        </div>
        <div>
          <dt>{t('Mejor racha')}</dt>
          <dd>{state.bestStreak}</dd>
        </div>
        <div>
          <dt>{t('Pistas utilizadas')}</dt>
          <dd>{3 - state.hintsLeft}</dd>
        </div>
      </dl>
      <div className="result-actions">
        {missed.length > 0 && (
          <button className="button" onClick={() => replay(missed)}>
            {t('Una segunda lectura · ')}
            {missed.length} {missed.length === 1 ? t('error') : t('errores')} →
          </button>
        )}
        <button
          className={missed.length ? 'button button-outline' : 'button'}
          onClick={() => replay()}
        >
          {t('Nueva partida')}
        </button>
        <Link to="/" onClick={reset} className="text-link">
          {t('Borrar resultado y salir')}
        </Link>
      </div>
      {missed.length > 0 && (
        <p className="small">
          {t('El repaso se juega sin reloj y empieza con puntuación y pistas nuevas.')}
        </p>
      )}
      <div className="section-intro">
        <span className="eyebrow">{t('NOTAS AL MARGEN')}</span>
        <h2>{t('Las historias detrás de tus respuestas.')}</h2>
      </div>
      <ResultsList questions={state.questions} answers={state.answers} />
    </section>
  );
}
