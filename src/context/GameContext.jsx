import { createContext, useReducer } from 'react';
import { gameReducer, initialState } from '../game/gameReducer';
export const GameStateContext = createContext(null);
export const GameDispatchContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return <GameDispatchContext.Provider value={dispatch}>
    <GameStateContext.Provider value={state}>{children}</GameStateContext.Provider>
  </GameDispatchContext.Provider>;
}
