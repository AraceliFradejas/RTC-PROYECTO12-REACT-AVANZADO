import { LocalLink as Link } from './LocalLink';
import { useLanguage } from '../context/LanguageContext';
import '../styles/footer.css';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Link className="footer-title" to="/">
            The Poets Archive.
          </Link>
          <p className="footer-tagline">{t('Para quienes sienten las palabras.')}</p>
        </div>
        <Link className="footer-sources" to="/archivo">
          {t('Fuentes y créditos ↗')}
        </Link>
      </div>
      <div className="footer-details">
        <p className="footer-credit">
          <span>© 2026</span>{' '}
          <a href="https://github.com/AraceliFradejas" target="_blank" rel="noopener noreferrer">
            Araceli Fradejas Muñoz
          </a>
        </p>
        <div className="footer-academic">
          <p>
            {t('Proyecto académico del máster Rock The Code de')}{' '}
            <a
              href="https://thepower.education/thepowermba/tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Power Tech School
            </a>
            .
          </p>
          <p className="footer-disclaimer">
            {t(
              'Juego de React avanzado con fines educativos. Proyecto independiente, sin afiliación con Taylor Swift ni sus representantes.',
            )}
          </p>
          <p className="footer-inspiration">
            {t('Hecho con cariño swiftie, inspirado en las palabras y la música de Taylor Swift.')}
          </p>
        </div>
      </div>
    </footer>
  );
}
