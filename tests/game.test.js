import { describe, it, expect } from 'vitest';
import { gameReducer, initialState } from '../src/game/gameReducer';
import { questions } from '../src/data/questions';
import { shuffle } from '../src/game/shuffle';
const begin = (mode = 'calm') => gameReducer(initialState, { type: 'START', questions, mode, now: 1000 });
const answer = (state, author = state.questions[state.index].author, now = 2000) => gameReducer(state, { type: 'ANSWER', id: state.questions[state.index].id, author, now });
const next = state => gameReducer(state, { type: 'NEXT', now: 3000 });
describe('Reglas de la partida', () => {
  it('puntúa una sola vez aunque llegue un doble clic', () => {
    const state = answer(begin());
    expect(state.score).toBe(100);
    expect(answer(state)).toBe(state);
    expect(state.answers).toHaveLength(1);
  });
  it('limita las pistas y aplica el descuento solo a la pregunta actual', () => {
    let state = begin();
    for (let i = 0; i < 3; i++) {
      state = gameReducer(state, { type: 'HINT' });
      expect(gameReducer(state, { type: 'HINT' })).toBe(state);
      state = next(answer(state));
    }
    expect(state.hintsLeft).toBe(0);
    expect(gameReducer(state, { type: 'HINT' })).toBe(state);
    expect(answer(state).score).toBe(250);
  });
  it('no avanza sin respuesta ni acepta eventos de otra pregunta', () => {
    const state = begin();
    expect(next(state)).toBe(state);
    expect(gameReducer(state, { type: 'ANSWER', id: 'otra', author: 'taylor' })).toBe(state);
  });
  it('una respuesta fuera de plazo cuenta como tiempo agotado', () => {
    const state = answer(begin('timed'), 'taylor', 21000);
    expect(state.score).toBe(0);
    expect(state.answers[0].author).toBeNull();
  });
  it('no limita el tiempo en modo tranquilo', () => expect(answer(begin(), 'taylor', 999999).score).toBe(100));
  it('un fallo interrumpe la racha y conserva la mejor', () => {
    let state = next(answer(begin()));
    state = next(answer(state));
    state = answer(state, null);
    expect(state.streak).toBe(0);
    expect(state.bestStreak).toBe(2);
  });
  it('termina exactamente tras diez respuestas y permite borrar el resultado', () => {
    let state = begin();
    for (let i = 0; i < questions.length; i++) state = next(answer(state));
    expect(state.phase).toBe('finished');
    expect(state.score).toBe(1000);
    expect(next(state)).toBe(state);
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.answers).toHaveLength(0);
    expect(reset.score).toBe(0);
    expect(reset.phase).toBe('idle');
  });
  it('el repaso admite una sola pregunta y empieza con recursos nuevos', () => {
    const previous = answer(gameReducer(begin(), { type: 'HINT' }));
    const review = gameReducer(previous, { type: 'START', questions: [questions[0]], mode: 'calm', now: 10000 });
    expect(review.score).toBe(0);
    expect(review.hintsLeft).toBe(3);
    expect(next(answer(review)).phase).toBe('finished');
  });
});
describe('Catálogo', () => {
  it('contiene diez obras diferentes con atribuciones y fuentes HTTPS', () => {
    expect(questions).toHaveLength(10);
    for (const key of ['id', 'quote', 'work']) expect(new Set(questions.map(q => q[key])).size).toBe(questions.length);
    expect(questions.filter(q => q.author === 'taylor')).toHaveLength(5);
    for (const question of questions) {
      expect(new URL(question.source).protocol).toBe('https:');
      expect(question.credits.length).toBeGreaterThan(20);
      if (question.author === 'taylor') expect(question.quote.split(/\s+/).length).toBeLessThanOrEqual(10);
    }
  });
  it('mezcla sin mutar el catálogo ni perder preguntas', () => {
    const copy = [...questions];
    const mixed = shuffle(questions, () => 0);
    expect(questions).toEqual(copy);
    expect(mixed).not.toEqual(copy);
    expect(new Set(mixed)).toEqual(new Set(copy));
  });
});
