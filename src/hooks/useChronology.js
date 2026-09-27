import { useCallback } from 'react';
import { useChronologyState, useChronologyDispatch } from '../context/ChronologyContext';
import { eras } from '../data/eras';
import { shuffle } from '../game/shuffle';
import { isChronologicalOrder } from '../game/isChronologicalOrder';
export function useChronology() {
  const state = useChronologyState();
  const dispatch = useChronologyDispatch();
  const start = useCallback(() => {
    let albums = shuffle(eras).slice(0, 6);
    if (isChronologicalOrder(albums)) albums = [...albums].reverse();
    dispatch({ type: 'START', albums });
  }, [dispatch]);
  return { state, start, dispatch };
}
