export const englishPaths = { '/': '/en', '/instrucciones': '/en/how-to-play', '/archivo': '/en/archive', '/partida': '/en/game', '/resultados': '/en/results', '/404': '/en/404', '/cuaderno': '/en/notebook', '/cronologia': '/en/timeline' };
export function languageFor(path) { return /^\/en(?:\/|$)/.test(path) ? 'en' : 'es'; }
export function basePath(path) {
  const clean = path.replace(/\/$/, '') || '/';
  return Object.keys(englishPaths).find(key => englishPaths[key] === clean) || clean.replace(/^\/en(?=\/)/, '');
}
export function localPath(path, language) { return language === 'en' ? englishPaths[path] || `/en${path}` : path; }
