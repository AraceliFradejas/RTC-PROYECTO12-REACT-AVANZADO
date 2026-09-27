import { createContext, useContext, useReducer } from 'react';
const State = createContext(null);
const Actions = createContext(null);
const initial = { saved: [], discovered: [], history: [] };
export function notebookReducer(state, action) {
  switch (action.type) {
    case 'SAVE':
      return {
        ...state,
        saved: state.saved.includes(action.id)
          ? state.saved.filter((id) => id !== action.id)
          : [...state.saved, action.id],
      };
    case 'DISCOVER':
      return state.discovered.includes(action.id)
        ? state
        : { ...state, discovered: [...state.discovered, action.id] };
    case 'RECORD':
      return state.history.some((item) => item.id === action.result.id)
        ? state
        : { ...state, history: [action.result, ...state.history].slice(0, 20) };
    case 'CLEAR':
      return initial;
    default:
      return state;
  }
}
export function NotebookProvider({ children }) {
  const [state, dispatch] = useReducer(notebookReducer, initial);
  return (
    <Actions.Provider value={dispatch}>
      <State.Provider value={state}>{children}</State.Provider>
    </Actions.Provider>
  );
}
export function useNotebook() {
  return useContext(State);
}
export function useNotebookActions() {
  return useContext(Actions);
}
