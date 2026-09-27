import { useLanguage } from '../context/LanguageContext';
import Footer from './Footer';
import LanguageSwitcher from './LanguageSwitcher';
import { LocalNavLink as NavLink, LocalLink as Link } from './LocalLink';
import { Outlet } from 'react-router-dom';
import RouteEffects from './RouteEffects';
export default function Layout() {
  const { t } = useLanguage();
  return <>
    <a className="skip-link" href="#contenido">{t("Saltar al contenido")}</a>
    <header className="site-header"><Link to="/" className="brand" aria-label={t("The Poets Archive · Inicio")}><span className="brand-mark" aria-hidden="true">{t("P.")}</span><span>{t("THE POETS")}<br /><strong>{t("ARCHIVE")}</strong></span></Link><nav aria-label={t("Navegación principal")}><NavLink to="/" end>{t("El desafío")}</NavLink><NavLink to="/instrucciones">{t("Cómo jugar")}</NavLink><NavLink to="/archivo">{t("El archivo")}</NavLink></nav><LanguageSwitcher /></header>
    <RouteEffects /><main id="contenido" tabIndex={-1}><Outlet /></main>
    <Footer />
  </>;
}
