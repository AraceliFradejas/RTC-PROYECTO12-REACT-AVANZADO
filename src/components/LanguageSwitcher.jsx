import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { basePath, localPath } from '../i18n/routes';
export default function LanguageSwitcher() {
  const { pathname, search, hash } = useLocation();
  const { language, t } = useLanguage();
  const route = basePath(pathname);
  const knownRoute = route.startsWith('/en/') ? '/404' : route;
  return <div className="language-switcher" role="group" aria-label={t('Idioma')}>
    {['es', 'en'].map((code) => <Link key={code} to={`${localPath(knownRoute, code)}${search}${hash}`} lang={code === 'en' ? 'en-GB' : 'es'} hrefLang={code === 'en' ? 'en-GB' : 'es'} aria-current={language === code ? 'true' : undefined} aria-label={code === 'es' ? 'Español' : 'English (UK)'}>{code.toUpperCase()}</Link>)}
  </div>;
}
