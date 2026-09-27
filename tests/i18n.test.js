import { describe, it, expect } from 'vitest';
import english from '../src/i18n/en.json';
import { questions } from '../src/data/questions';
import { basePath, languageFor, localPath } from '../src/i18n/routes';
describe('Versiones de idioma', () => {
  it('todas las preguntas tienen pistas, explicaciones y créditos en inglés', () => {
    for (const question of questions) {
      for (const field of ['hint', 'explanation', 'credits']) {
        expect(english[question[field]], `${question.id}: ${field}`).toBeTruthy();
        expect(english[question[field]]).not.toBe(question[field]);
      }
    }
  });
  it('permite cambiar de idioma y volver a la misma página', () => {
    for (const route of ['/', '/archivo', '/instrucciones', '/partida', '/resultados', '/404', '/no-existe']) {
      expect(basePath(localPath(route, 'en'))).toBe(route);
      expect(languageFor(localPath(route, 'en'))).toBe('en');
    }
    expect(basePath('/en/')).toBe('/');
    expect(basePath('/en/archive/')).toBe('/archivo');
  });
});
