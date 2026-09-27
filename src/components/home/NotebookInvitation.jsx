import { useLanguage } from '../../context/LanguageContext';
import { useNotebook } from '../../context/NotebookContext';
import { LocalLink as Link } from '../LocalLink';
export default function NotebookInvitation() {
  const { t } = useLanguage();
  const { discovered, saved, history } = useNotebook();
  return (
    <section className="notebook-invitation">
      <div className="invitation-art" aria-hidden="true">
        <span>
          THE
          <br />
          POETS
          <br />
          <i>Notebook.</i>
        </span>
        <small>NOTES, WORDS & DISCOVERIES</small>
      </div>
      <div>
        <p className="eyebrow">{t('LO QUE TE LLEVAS DEL ARCHIVO')}</p>
        <h2>{t('Tu colección empieza con una palabra.')}</h2>
        <p>
          {t(
            'Guarda las obras que te sorprendan, descubre tus sellos de lectura y vuelve a tus partidas. Un cuaderno personal, solo durante esta sesión.',
          )}
        </p>
        <dl className="session-tally">
          <div>
            <dt>{t('Descubiertas')}</dt>
            <dd>{discovered.length}</dd>
          </div>
          <div>
            <dt>{t('Guardadas')}</dt>
            <dd>{saved.length}</dd>
          </div>
          <div>
            <dt>{t('Partidas')}</dt>
            <dd>{history.length}</dd>
          </div>
        </dl>
        <Link className="text-link" to="/cuaderno">
          {t('Abrir mi cuaderno')} ↗
        </Link>
      </div>
    </section>
  );
}
