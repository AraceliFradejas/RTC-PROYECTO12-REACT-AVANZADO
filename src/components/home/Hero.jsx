import { useLanguage } from '../../context/LanguageContext';
import { LocalLink as Link } from '../LocalLink';
export default function Hero() {
  const { t } = useLanguage();
  return <section className="hero cinematic-hero" aria-labelledby="home-title">
    <img className="hero-photograph" src="/images/reading-room.jpg" alt="" width="1536" height="1024" fetchPriority="high"/>
    <div className="hero-copy"><p className="eyebrow">{t('EL ARCHIVO ESTÁ ABIERTO · VOL. II')}</p>
      <h1 tabIndex={-1} id="home-title">The Tortured<br/>Poets <em>Challenge.</em></h1>
      <p className="hero-question">{t('Donde las palabras dejan huella.')}</p>
      <p className="hero-description">{t('Una voz, una obra, una era. Entra en un archivo de canciones y literatura, sigue las pistas y crea tu propia colección de hallazgos.')}</p>
      <div className="hero-links"><a className="button" href="#elige-modo">{t('Explorar los desafíos')} <span aria-hidden="true">↗</span></a><Link to="/cuaderno">{t('Abrir mi cuaderno')} →</Link></div>
    </div>
    <div className="hero-folio" aria-hidden="true"><span>THE POETS ARCHIVE</span><i>{t('Para leer. Para sentir. Para volver.')}</i><span>EST. 2026 — 01 / 03</span></div>
    <div className="hero-bottom"><span>{t('MÚSICA, MEMORIA & LITERATURA')}</span><span>{t('Tres maneras de entrar. Una historia que es tuya.')}</span></div>
  </section>;
}
