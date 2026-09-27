import { createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import { pages, siteName, notFound } from '../src/seo/metadata.js';
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const { renderPage } = await server.ssrLoadModule('/src/seo/render.jsx');
  const template = await readFile('dist/index.html', 'utf8');
  const origin = process.env.SITE_URL?.replace(/\/$/, '');
  if (origin && !/^https:\/\/[^/]+$/.test(origin)) throw new Error('SITE_URL debe ser un origen HTTPS sin ruta');
  for (const [path, page] of Object.entries({ ...pages, '/404': notFound })) {
    const title = `${page.title} · ${siteName}`;
    let html = template.replace('<div id="root"></div>', `<div id="root" data-route="${path}">${renderPage(path)}</div>`)
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${page.description}`)
      .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${page.description}`)
      .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${title}`)
      .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${page.description}`)
      .replace('content="index,follow"', `content="${page.private ? 'noindex,follow' : 'index,follow'}"`);
    if (origin) html = html.replace('</head>', `<link rel="canonical" href="${origin}${path}"/><meta property="og:url" content="${origin}${path}"/></head>`);
    if (path === '/') {
      const schema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: siteName, inLanguage: 'es', applicationCategory: 'GameApplication', operatingSystem: 'Web browser', description: page.description, author: { '@type': 'Person', name: 'Araceli Fradejas Muñoz' }, ...(origin ? { url: origin } : {}) };
      html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`);
    }
    await writeFile(path === '/' ? 'dist/index.html' : `dist${path}.html`, html);
  }
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`);
  if (origin) await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).filter(path => !pages[path].private).map(path => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`);
  console.log(`HTML generado para ${Object.keys(pages).length} rutas. ${origin ? 'Dominio configurado.' : 'Pendiente SITE_URL para canonical y sitemap.'}`);
} finally { await server.close(); }
