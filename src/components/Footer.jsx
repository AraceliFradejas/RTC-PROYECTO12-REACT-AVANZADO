import { LocalLink as Link } from './LocalLink';
import { useLanguage } from '../context/LanguageContext';
export default function Footer() {
  const { t } = useLanguage();
  return <footer className="site-footer">
    <div className="footer-main"><div><Link className="footer-title" to="/">The Poets Archive.</Link><p>{t('Para quienes sienten las palabras.')}</p></div>
      <div className="footer-credit"><span>{t('Una creación de')} <a href="https://github.com/AraceliFradejas" target="_blank" rel="noreferrer">Araceli Fradejas Muñoz</a></span><small>{t('Proyecto educativo e independiente · No oficial')}</small></div>
      <Link to="/archivo">{t('Fuentes y créditos ↗')}</Link></div>
    <div className="footer-academic"><p>© 2026 Araceli Fradejas Muñoz. {t('Proyecto académico del máster Rock The Code de')} <a href="https://thepower.education/thepowermba/tech" target="_blank" rel="noopener noreferrer">The Power Tech School</a>.</p>
      <p>{t('Esta web demuestra el desarrollo de un juego con React avanzado y tiene fines exclusivamente educativos. No es un producto oficial ni está afiliado a Taylor Swift o a sus representantes.')}</p></div>
  </footer>;
}
