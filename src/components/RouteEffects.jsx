import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { pages, notFound, siteName } from '../seo/metadata';
export default function RouteEffects() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const page = pages[pathname] || notFound;
    document.title = `${page.title} · ${siteName}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
    document.querySelector('meta[name="robots"]')?.setAttribute('content', page.private ? 'noindex,follow' : 'index,follow');
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', page.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', page.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const url = new URL(pathname, canonical.href).href;
      canonical.href = url;
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
    }
    window.scrollTo(0, 0);
    if (previousPath.current !== pathname) document.querySelector('main h1')?.focus({ preventScroll: true });
    previousPath.current = pathname;
  }, [pathname]);
  return null;
}
