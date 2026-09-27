import { describe, it, expect } from 'vitest';
import { buildRound } from '../src/game/buildRound';
import { gameReducer, initialState } from '../src/game/gameReducer';
import { chronologyReducer, chronologyInitial } from '../src/game/chronologyReducer';
import { notebookReducer } from '../src/context/NotebookContext';
import { questions } from '../src/data/questions';
import { eras } from '../src/data/eras';
describe('La obra oculta', () => {
  it('ofrece cuatro obras distintas de la misma procedencia y una respuesta correcta', () => {
    const round = buildRound(questions, 'works');
    for (const question of round) {
      expect(question.choices).toHaveLength(4);
      expect(new Set(question.choices.map(choice => choice.id)).size).toBe(4);
      expect(question.choices.filter(choice => choice.id === question.answerKey)).toHaveLength(1);
      for (const choice of question.choices) expect(questions.find(item => item.id === choice.id).author).toBe(question.author);
    }
  });
  it('puntúa por la obra, rechaza respuestas ajenas y conserva el capítulo en el repaso', () => {
    const round = buildRound(questions, 'works');
    const state = gameReducer(initialState, { type: 'START', challenge: 'works', questions: round, now: 0 });
    expect(gameReducer(state, { type: 'ANSWER', id: round[0].id, author: 'no-existe', now: 0 })).toBe(state);
    const answered = gameReducer(state, { type: 'ANSWER', id: round[0].id, author: round[0].answerKey, now: 0 });
    expect(answered.score).toBe(100);
    const review = buildRound([round[0]], 'works');
    expect(review).toHaveLength(1);
    expect(review[0].choices).toHaveLength(4);
  });
});
describe('Cronología', () => {
  it('mueve sin perder álbumes, limita los extremos y termina en el orden correcto', () => {
    const pair = eras.slice(0, 2).reverse();
    let state = chronologyReducer(chronologyInitial, { type: 'START', albums: pair });
    expect(chronologyReducer(state, { type: 'MOVE', id: pair[0].id, direction: -1 })).toBe(state);
    state = chronologyReducer(state, { type: 'CHECK' });
    expect(state.phase).toBe('ordering');
    expect(state.checks).toBe(1);
    state = chronologyReducer(state, { type: 'MOVE', id: pair[1].id, direction: -1 });
    state = chronologyReducer(state, { type: 'CHECK' });
    expect(state.phase).toBe('finished');
    expect(state.checks).toBe(2);
    expect(chronologyReducer(state, { type: 'CHECK' })).toBe(state);
    expect(chronologyReducer(state, { type: 'RESET' }).albums).toHaveLength(0);
  });
});
describe('Cuaderno de sesión', () => {
  it('no duplica descubrimientos ni partidas y permite quitar favoritos y vaciar todo', () => {
    let state = { saved: [], discovered: [], history: [] };
    state = notebookReducer(state, { type: 'DISCOVER', id: 'fortnight' });
    expect(notebookReducer(state, { type: 'DISCOVER', id: 'fortnight' })).toBe(state);
    state = notebookReducer(state, { type: 'SAVE', id: 'fortnight' });
    expect(state.saved).toEqual(['fortnight']);
    state = notebookReducer(state, { type: 'SAVE', id: 'fortnight' });
    expect(state.saved).toEqual([]);
    const action = { type: 'RECORD', result: { id: 'quiz-1', score: 800 } };
    state = notebookReducer(state, action);
    expect(notebookReducer(state, action)).toBe(state);
    expect(notebookReducer(state, { type: 'CLEAR' })).toEqual({ saved: [], discovered: [], history: [] });
  });
  it('conserva las veinte partidas más recientes', () => {
    let state = { saved: [], discovered: [], history: [] };
    for (let index = 0; index < 25; index++) state = notebookReducer(state, { type: 'RECORD', result: { id: index } });
    expect(state.history).toHaveLength(20);
    expect(state.history[0].id).toBe(24);
  });
});
