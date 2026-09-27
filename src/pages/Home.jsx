import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { LocalLink as Link } from '../components/LocalLink';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import '../styles/home.css';
export default function Home() {
  const { t, path: localPath } = useLanguage();
  const [mode, setMode] = useState('calm');
  const { start, state } = useGame();
  const navigate = useNavigate();
  function begin(event) {event.preventDefault();start(mode);navigate(localPath('/partida'));}
  return <>
    <section className="hero" aria-labelledby="home-title">
      <div className="hero-copy">
        <p className="eyebrow">{t("UN ENCUENTRO ENTRE DOS MUNDOS · VOL. 01")}</p>
        <h1 tabIndex={-1} id="home-title">{t("The Tortured")}<br />{t("Poets ")}<em>{t("Challenge.")}</em></h1>
        <div className="hero-rule" />
        <p className="hero-question">{t("¿Taylor Swift o Shakespeare?")}</p>
        <p className="hero-description">{t("Siglos de distancia. Las mismas emociones.")}<br />{t("Diez fragmentos para descubrir si reconoces la pluma")}<br className="desktop-break" />{t(" detrás de las palabras.")}</p>
        <a className="text-link" href="#elige-modo">{t("Encuentra tu forma de jugar ")}<span aria-hidden="true">↓</span></a>
      </div>
      <div className="editorial-art" aria-hidden="true">
        <div className="archive-label">{t("ARCHIVO DE POETAS")}<br />{t("DEPARTAMENTO DE EMOCIONES")}</div>
        <div className="paper paper-back"><span>{t("Notas al margen")}</span><i>{t("Amor.")}<br />{t("Ausencia.")}<br />{t("Memoria.")}</i></div>
        <div className="paper paper-front"><span className="eyebrow">{t("DOS PLUMAS. UN MISMO LATIDO.")}</span><div className="quill">❧</div><p>{t("Algunas palabras")}<br />{t("no pertenecen")}<br />{t("a una época.")}<br /><em>{t("Pertenecen")}<br />{t("a lo que sentimos.")}</em></p><span className="paper-signature">{t("El archivo · I")}</span></div>
        <div className="seal">{t("P")}<span>{t("THE POETS ARCHIVE")}</span></div>
        <span className="art-caption">{t("MÚSICA & LITERATURA — SIN FECHA DE CADUCIDAD")}</span>
      </div>
    </section>
    <section className="game-entry" id="elige-modo" aria-labelledby="choose-title">
      <div className="section-intro"><span className="eyebrow">{t("01 / ABRE EL ARCHIVO")}</span><h2 id="choose-title">{t("Cada lectura tiene su ritmo.")}</h2><p>{t("Elige el tuyo. Las palabras te esperan.")}</p></div>
      <form onSubmit={begin}>
        <fieldset className="mode-options"><legend className="sr-only">{t("Modo de partida")}</legend>
          <label className={`mode-card ${mode === 'calm' ? 'selected' : ''}`}><input type="radio" name="mode" value="calm" checked={mode === 'calm'} onChange={() => setMode('calm')} /><span className="mode-icon" aria-hidden="true">✧</span><span className="mode-text"><strong>{t("Sin prisa")}</strong><span>{t("Lee, siente y decide. Sin reloj.")}</span></span><span className="mode-detail">{t("MODO TRANQUILO")}</span></label>
          <label className={`mode-card ${mode === 'timed' ? 'selected' : ''}`}><input type="radio" name="mode" value="timed" checked={mode === 'timed'} onChange={() => setMode('timed')} /><span className="mode-icon" aria-hidden="true">◷</span><span className="mode-text"><strong>{t("A contrarreloj")}</strong><span>{t("Confía en tu intuición. 20 s por fragmento.")}</span></span><span className="mode-detail">{t("MODO DESAFÍO")}</span></label>
        </fieldset>
        <div className="entry-actions"><button className="button" type="submit">{t("Comenzar una nueva historia ")}<span aria-hidden="true">→</span></button><Link className="text-link" to="/instrucciones">{t("Antes de empezar: las reglas ↗")}</Link></div>
      </form>
      {state.phase !== 'idle' && <p className="session-note">{t("Tienes una lectura en esta sesión. ")}<Link to={state.phase === 'finished' ? '/resultados' : '/partida'}>{t("Volver a ella")}</Link>{t(". Empezar otra sustituye la anterior.")}</p>}
    </section>
    <section className="home-notes" aria-label={t("La experiencia")}><div><span className="eyebrow">{t("I. LEE ENTRE LÍNEAS")}</span><p>{t("Diez fragmentos. Dos universos.")}<br />{t("Una intuición: la tuya.")}</p></div><div><span className="eyebrow">{t("II. DESCUBRE LA HISTORIA")}</span><p>{t("Después de cada respuesta,")}<br />{t("la obra y su contexto.")}</p></div><div><span className="eyebrow">{t("III. VUELVE A LAS PALABRAS")}</span><p>{t("Repasa tus errores.")}<br />{t("Siempre hay una segunda lectura.")}</p></div></section>
  </>;
}
