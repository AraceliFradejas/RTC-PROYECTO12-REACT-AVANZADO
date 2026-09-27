import { isChronologicalOrder } from './isChronologicalOrder';

export const chronologyInitial = { phase: 'idle', albums: [], checks: 0, round: 0 };
export function chronologyReducer(state, action) {
  if (action.type === 'START')
    return {
      ...chronologyInitial,
      phase: 'ordering',
      albums: action.albums,
      round: state.round + 1,
    };
  if (action.type === 'RESET') return { ...chronologyInitial, round: state.round + 1 };
  if (state.phase !== 'ordering') return state;
  if (action.type === 'MOVE' || action.type === 'REORDER') {
    const index = state.albums.findIndex((album) => album.id === action.id);
    const target =
      action.type === 'REORDER'
        ? state.albums.findIndex((album) => album.id === action.overId)
        : index + action.direction;
    if (index < 0 || target < 0 || target >= state.albums.length || target === index) return state;
    if (action.type === 'MOVE' && ![-1, 1].includes(action.direction)) return state;
    const albums = [...state.albums];
    const [album] = albums.splice(index, 1);
    albums.splice(target, 0, album);
    return { ...state, albums, checked: false };
  }
  if (action.type === 'CHECK') {
    const complete = isChronologicalOrder(state.albums);
    return {
      ...state,
      checks: state.checks + 1,
      checked: true,
      phase: complete ? 'finished' : 'ordering',
    };
  }
  return state;
}
