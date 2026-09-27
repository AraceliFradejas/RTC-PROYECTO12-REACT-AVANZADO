import { useCallback, useContext } from 'react';
import { GameStateContext, GameDispatchContext } from '../context/GameContext';
import { questions } from '../data/questions';
import { shuffle } from '../game/shuffle';

export function useGame() {
  const state = useContext(GameStateContext);
  const dispatch = useContext(GameDispatchContext);
  if (!state || !dispatch) throw new Error('useGame necesita GameProvider');
  const start = useCallback((mode = 'calm', pool = questions) => {
    dispatch({ type: 'START', mode, now: Date.now(), questions: shuffle(pool).slice(0, 10) });
  }, [dispatch]);
  const answer = useCallback((id, author) => dispatch({ type: 'ANSWER', id, author, now: Date.now() }), [dispatch]);
  const hint = useCallback(() => dispatch({ type: 'HINT' }), [dispatch]);
  const next = useCallback(() => dispatch({ type: 'NEXT', now: Date.now() }), [dispatch]);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [dispatch]);
  return { state, start, answer, hint, next, reset };
}
