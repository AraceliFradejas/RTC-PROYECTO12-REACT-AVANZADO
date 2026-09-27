import { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import english from '../i18n/en.json';
import { languageFor, localPath } from '../i18n/routes';
const values = Object.fromEntries(
  ['es', 'en'].map((language) => [
    language,
    {
      language,
      locale: language === 'en' ? 'en-GB' : 'es',
      path: (route) => localPath(route, language),
      t: (text, params = {}) =>
        (language === 'en' ? (english[text] ?? text) : text).replace(
          /\{(\w+)\}/g,
          (match, key) => params[key] ?? match,
        ),
    },
  ]),
);
const LanguageContext = createContext(values.es);
export function LanguageProvider({ children }) {
  const { pathname } = useLocation();
  return (
    <LanguageContext.Provider value={values[languageFor(pathname)]}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  return useContext(LanguageContext);
}
