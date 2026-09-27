import { NavLink, Link, Outlet } from 'react-router-dom';
import RouteEffects from './RouteEffects';
export default function Layout() {
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header"><Link to="/" className="brand" aria-label="The Poets Archive · Inicio"><span className="brand-mark" aria-hidden="true">P.</span><span>THE POETS<br/><strong>ARCHIVE</strong></span></Link><nav aria-label="Navegación principal"><NavLink to="/" end>El desafío</NavLink><NavLink to="/instrucciones">Cómo jugar</NavLink><NavLink to="/archivo">El archivo</NavLink></nav><span className="header-note">EST. 2026<br/>UNA LECTURA DIFERENTE</span></header>
    <RouteEffects/><main id="contenido" tabIndex={-1}><Outlet/></main>
    <footer className="site-footer"><div><Link className="footer-title" to="/">The Poets Archive.</Link><p>Para quienes sienten las palabras.</p></div><div className="footer-credit"><span>Una creación de <a href="https://github.com/AraceliFradejas" target="_blank" rel="noreferrer">Araceli Fradejas Muñoz</a></span><small>Proyecto educativo e independiente · No oficial</small></div><Link to="/archivo">Fuentes y créditos ↗</Link></footer>
  </>;
}
