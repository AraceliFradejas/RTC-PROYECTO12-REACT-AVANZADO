import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pages, englishPages, englishNotFound, siteName, notFound } from '../src/seo/metadata.js';
import { englishPaths, languageFor, basePath } from '../src/i18n/routes.js';
const allPages = { ...pages, '/404': notFound, ...Object.fromEntries(Object.entries({ ...englishPages, '/404': englishNotFound }).map(([path, page]) => [englishPaths[path], page])) };
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const { renderPage } = await server.ssrLoadModule('/src/seo/render.jsx');
  const template = await readFile('dist/index.html', 'utf8');
  const origin = process.env.SITE_URL?.replace(/\/$/, '');
  if (origin && !/^https:\/\/[^/]+$/.test(origin)) throw new Error('SITE_URL debe ser un origen HTTPS sin ruta');
  for (const [path, page] of Object.entries(allPages)) {
    const language = languageFor(path);
    const locale = language === 'en' ? 'en-GB' : 'es';
    const title = `${page.title} · ${siteName}`;
    let html = template.replace('<html lang="es">', `<html lang="${locale}">`).replace('content="es_ES"', `content="${language === 'en' ? 'en_GB' : 'es_ES'}"`).replace('<div id="root"></div>', `<div id="root" data-route="${path}">${renderPage(path)}</div>`)
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${page.description}`)
      .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${page.description}`)
      .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${title}`)
      .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${page.description}`)
      .replace('content="index,follow"', `content="${page.private ? 'noindex,follow' : 'index,follow'}"`);
    if (language === 'en') html = html.replace('Para jugar necesitas activar JavaScript. Puedes leer las reglas y las fuentes del archivo sin activarlo.', 'Enable JavaScript to play. You can read the rules and sources without it.');
    if (origin && !page.private) {
      const base = basePath(path);
      html = html.replace('</head>', `<link rel="alternate" hreflang="es" href="${origin}${base}"/><link rel="alternate" hreflang="en-GB" href="${origin}${englishPaths[base]}"/><link rel="alternate" hreflang="x-default" href="${origin}${base}"/></head>`);
    }
    if (origin) html = html.replace('</head>', `<link rel="canonical" href="${origin}${path}"/><meta property="og:url" content="${origin}${path}"/></head>`);
    if (path === '/' || path === '/en') {
      const schema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: siteName, inLanguage: locale, applicationCategory: 'GameApplication', operatingSystem: 'Web browser', description: page.description, author: { '@type': 'Person', name: 'Araceli Fradejas Muñoz' }, ...(origin ? { url: `${origin}${path}` } : {}) };
      html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`);
    }
    await mkdir('dist/en', { recursive: true });
    await writeFile(path === '/' ? 'dist/index.html' : `dist${path}.html`, html);
  }
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`);
  if (origin) await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(allPages).filter(path => !allPages[path].private).map(path => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`);
  console.log(`HTML generado para ${Object.keys(allPages).length} rutas. ${origin ? 'Dominio configurado.' : 'Pendiente SITE_URL para canonical y sitemap.'}`);
} finally { await server.close(); }
