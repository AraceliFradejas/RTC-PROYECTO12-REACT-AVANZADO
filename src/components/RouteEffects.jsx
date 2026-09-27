import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { pages, englishPages, notFound, englishNotFound, siteName } from '../seo/metadata';
import { basePath, localPath } from '../i18n/routes';
import { useLanguage } from '../context/LanguageContext';
export default function RouteEffects() {
  const { pathname } = useLocation();
  const { language, locale } = useLanguage();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const route = basePath(pathname);
    const page =
      (language === 'en' ? englishPages[route] : pages[route]) ||
      (language === 'en' ? englishNotFound : notFound);
    document.documentElement.lang = locale;
    document.title = `${page.title} · ${siteName}`;
    const meta = (selector, value) =>
      document.querySelector(selector)?.setAttribute('content', value);
    meta('meta[name="description"]', page.description);
    meta('meta[name="robots"]', page.private ? 'noindex,follow' : 'index,follow');
    meta('meta[property="og:title"]', document.title);
    meta('meta[property="og:description"]', page.description);
    meta('meta[property="og:locale"]', language === 'en' ? 'en_GB' : 'es_ES');
    meta('meta[name="twitter:title"]', document.title);
    meta('meta[name="twitter:description"]', page.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = new URL(pathname, canonical.href).href;
      meta('meta[property="og:url"]', canonical.href);
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => {
        link.href = new URL(
          localPath(route, link.hreflang === 'en-GB' ? 'en' : 'es'),
          canonical.href,
        ).href;
      });
    }
    const schema = document.querySelector('script[type="application/ld+json"]');
    if (schema) {
      const data = JSON.parse(schema.textContent);
      data.inLanguage = locale;
      data.description = page.description;
      if (canonical) data.url = canonical.href;
      schema.textContent = JSON.stringify(data);
    }
    if (previousPath.current !== pathname) {
      window.scrollTo(0, 0);
      document.querySelector('main h1')?.focus({ preventScroll: true });
    }
    previousPath.current = pathname;
  }, [pathname, language, locale]);
  return null;
}
