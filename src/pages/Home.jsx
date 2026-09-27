import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LocalLink as Link } from '../components/LocalLink';
import { useGame } from '../hooks/useGame';
import { useChronology } from '../hooks/useChronology';
import Hero from '../components/home/Hero';
import ChallengePicker from '../components/home/ChallengePicker';
import ModePicker from '../components/home/ModePicker';
import NotebookInvitation from '../components/home/NotebookInvitation';
import '../styles/home.css';
import '../styles/chapters.css';
export default function Home() {
  const { t, path } = useLanguage();
  const [mode, setMode] = useState('calm');
  const [challenge, setChallenge] = useState('voices');
  const { start, state } = useGame();
  const chronology = useChronology();
  const navigate = useNavigate();
  function begin(event) {
    event.preventDefault();
    if (challenge === 'eras') {
      chronology.start();
      navigate(path('/cronologia'));
    } else {
      start(mode, undefined, challenge);
      navigate(path('/partida'));
    }
  }
  return (
    <>
      <Hero />
      <div className="archive-ribbon">
        <span>{t('TRES CAPÍTULOS')}</span>
        <span>ES / EN</span>
        <span>{t('SIN CUENTAS. SOLO CURIOSIDAD.')}</span>
        <span>{t('CADA RESPUESTA TIENE UNA HISTORIA')}</span>
      </div>
      <section className="game-entry" id="elige-modo" aria-labelledby="choose-title">
        <div className="section-intro">
          <span className="eyebrow">01 / {t('ELIGE TU CAPÍTULO')}</span>
          <h2 id="choose-title">{t('No todas las historias se leen igual.')}</h2>
          <p>{t('Empieza por una intuición. Quédate por lo que descubres.')}</p>
        </div>
        <form onSubmit={begin}>
          <ChallengePicker value={challenge} onChange={setChallenge} />
          {challenge !== 'eras' ? (
            <ModePicker mode={mode} onChange={setMode} />
          ) : (
            <p className="chronology-note">
              {t(
                'Seis álbumes elegidos de un archivo de diez. Sin reloj: ordénalos del más antiguo al más reciente.',
              )}
            </p>
          )}
          <div className="entry-actions">
            <button className="button" type="submit">
              {t('Comenzar una nueva historia ')}
              <span aria-hidden="true">→</span>
            </button>
            <Link className="text-link" to="/instrucciones">
              {t('Antes de empezar: las reglas ↗')}
            </Link>
          </div>
        </form>
        {state.phase !== 'idle' && (
          <p className="session-note">
            {t('Tienes una lectura en esta sesión. ')}
            <Link to={state.phase === 'finished' ? '/resultados' : '/partida'}>
              {t('Volver a ella')}
            </Link>
            {t('. Empezar otra sustituye la anterior.')}
          </p>
        )}
        {chronology.state.phase !== 'idle' && (
          <p className="session-note">
            <Link to="/cronologia">{t('Retomar mi cronología')} →</Link>
          </p>
        )}
      </section>
      <NotebookInvitation />
    </>
  );
}
