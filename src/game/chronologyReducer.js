import { isChronologicalOrder } from './isChronologicalOrder';

export const chronologyInitial = { phase: 'idle', albums: [], checks: 0, round: 0 };
export function chronologyReducer(state, action) {
  if (action.type === 'START') return { ...chronologyInitial, phase: 'ordering', albums: action.albums, round: state.round + 1 };
  if (action.type === 'RESET') return { ...chronologyInitial, round: state.round + 1 };
  if (state.phase !== 'ordering') return state;
  if (action.type === 'MOVE') {
    const index = state.albums.findIndex(album => album.id === action.id);
    const target = index + action.direction;
    if (index < 0 || ![-1, 1].includes(action.direction) || target < 0 || target >= state.albums.length) return state;
    const albums = [...state.albums];
    [albums[index], albums[target]] = [albums[target], albums[index]];
    return { ...state, albums, checked: false };
  }
  if (action.type === 'CHECK') {
    const complete = isChronologicalOrder(state.albums);
    return { ...state, checks: state.checks + 1, checked: true, phase: complete ? 'finished' : 'ordering' };
  }
  return state;
}
