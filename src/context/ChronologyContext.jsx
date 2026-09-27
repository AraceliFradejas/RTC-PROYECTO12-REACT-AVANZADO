import { createContext, useContext, useReducer } from 'react';
import { chronologyReducer, chronologyInitial } from '../game/chronologyReducer';
const State = createContext(null);
const Actions = createContext(null);
export function ChronologyProvider({ children }) {
  const [state, dispatch] = useReducer(chronologyReducer, chronologyInitial);
  return (
    <Actions.Provider value={dispatch}>
      <State.Provider value={state}>{children}</State.Provider>
    </Actions.Provider>
  );
}
export function useChronologyState() {
  return useContext(State);
}
export function useChronologyDispatch() {
  return useContext(Actions);
}
