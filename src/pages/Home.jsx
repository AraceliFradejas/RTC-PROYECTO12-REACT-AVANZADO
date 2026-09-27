import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import '../styles/home.css';
export default function Home() {
  const [mode, setMode] = useState('calm');
  const { start, state } = useGame();
  const navigate = useNavigate();
  function begin(event) { event.preventDefault(); start(mode); navigate('/partida'); }
  return <>
    <section className="hero" aria-labelledby="home-title">
      <div className="hero-copy">
        <p className="eyebrow">UN ENCUENTRO ENTRE DOS MUNDOS · VOL. 01</p>
        <h1 tabIndex={-1} id="home-title">The Tortured<br/>Poets <em>Challenge.</em></h1>
        <div className="hero-rule"/>
        <p className="hero-question">¿Taylor Swift o Shakespeare?</p>
        <p className="hero-description">Siglos de distancia. Las mismas emociones.<br/>Diez fragmentos para descubrir si reconoces la pluma<br className="desktop-break"/> detrás de las palabras.</p>
        <a className="text-link" href="#elige-modo">Encuentra tu forma de jugar <span aria-hidden="true">↓</span></a>
      </div>
      <div className="editorial-art" aria-hidden="true">
        <div className="archive-label">ARCHIVO DE POETAS<br/>DEPARTAMENTO DE EMOCIONES</div>
        <div className="paper paper-back"><span>Notas al margen</span><i>Amor.<br/>Ausencia.<br/>Memoria.</i></div>
        <div className="paper paper-front"><span className="eyebrow">DOS PLUMAS. UN MISMO LATIDO.</span><div className="quill">❧</div><p>Algunas palabras<br/>no pertenecen<br/>a una época.<br/><em>Pertenecen<br/>a lo que sentimos.</em></p><span className="paper-signature">El archivo · I</span></div>
        <div className="seal">P<span>THE POETS ARCHIVE</span></div>
        <span className="art-caption">MÚSICA & LITERATURA — SIN FECHA DE CADUCIDAD</span>
      </div>
    </section>
    <section className="game-entry" id="elige-modo" aria-labelledby="choose-title">
      <div className="section-intro"><span className="eyebrow">01 / ABRE EL ARCHIVO</span><h2 id="choose-title">Cada lectura tiene su ritmo.</h2><p>Elige el tuyo. Las palabras te esperan.</p></div>
      <form onSubmit={begin}>
        <fieldset className="mode-options"><legend className="sr-only">Modo de partida</legend>
          <label className={`mode-card ${mode === 'calm' ? 'selected' : ''}`}><input type="radio" name="mode" value="calm" checked={mode === 'calm'} onChange={() => setMode('calm')}/><span className="mode-icon" aria-hidden="true">✧</span><span className="mode-text"><strong>Sin prisa</strong><span>Lee, siente y decide. Sin reloj.</span></span><span className="mode-detail">MODO TRANQUILO</span></label>
          <label className={`mode-card ${mode === 'timed' ? 'selected' : ''}`}><input type="radio" name="mode" value="timed" checked={mode === 'timed'} onChange={() => setMode('timed')}/><span className="mode-icon" aria-hidden="true">◷</span><span className="mode-text"><strong>A contrarreloj</strong><span>Confía en tu intuición. 20 s por fragmento.</span></span><span className="mode-detail">MODO DESAFÍO</span></label>
        </fieldset>
        <div className="entry-actions"><button className="button" type="submit">Comenzar una nueva historia <span aria-hidden="true">→</span></button><Link className="text-link" to="/instrucciones">Antes de empezar: las reglas ↗</Link></div>
      </form>
      {state.phase !== 'idle' && <p className="session-note">Tienes una lectura en esta sesión. <Link to={state.phase === 'finished' ? '/resultados' : '/partida'}>Volver a ella</Link>. Empezar otra sustituye la anterior.</p>}
    </section>
    <section className="home-notes" aria-label="La experiencia"><div><span className="eyebrow">I. LEE ENTRE LÍNEAS</span><p>Diez fragmentos. Dos universos.<br/>Una intuición: la tuya.</p></div><div><span className="eyebrow">II. DESCUBRE LA HISTORIA</span><p>Después de cada respuesta,<br/>la obra y su contexto.</p></div><div><span className="eyebrow">III. VUELVE A LAS PALABRAS</span><p>Repasa tus errores.<br/>Siempre hay una segunda lectura.</p></div></section>
  </>;
}
