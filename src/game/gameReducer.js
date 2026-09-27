import { QUESTION_DURATION_MS } from './timing';
export const initialState = {
  phase: 'idle', challenge: 'voices', questions: [], index: 0, answers: [], mode: 'calm',
  hintsLeft: 3, hinted: false, score: 0, streak: 0, bestStreak: 0, round: 0, deadline: null,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START':
      if (!action.questions?.length) return state;
      return { ...initialState, phase: 'question', questions: action.questions,
        challenge: action.challenge === 'works' ? 'works' : 'voices',
        mode: action.mode === 'timed' ? 'timed' : 'calm', round: state.round + 1, deadline: action.now + QUESTION_DURATION_MS };
    case 'HINT':
      if (state.phase !== 'question' || state.hinted || !state.hintsLeft) return state;
      return { ...state, hinted: true, hintsLeft: state.hintsLeft - 1 };
    case 'ANSWER': {
      const question = state.questions[state.index];
      if (state.phase !== 'question' || action.id !== question.id) return state;
      if (![null, ...(question.choices?.map(choice => choice.id) || ['taylor', 'shakespeare'])].includes(action.author)) return state;
      const author = state.mode === 'timed' && action.now >= state.deadline ? null : action.author;
      const correct = author === (question.answerKey || question.author);
      const points = correct ? (state.hinted ? 50 : 100) : 0;
      const streak = correct ? state.streak + 1 : 0;
      return { ...state, phase: 'reveal', score: state.score + points, streak,
        bestStreak: Math.max(streak, state.bestStreak),
        answers: [...state.answers, { id: question.id, author,
          correct, points, hinted: state.hinted }] };
    }
    case 'NEXT':
      if (state.phase !== 'reveal') return state;
      if (state.index === state.questions.length - 1) return { ...state, phase: 'finished' };
      return { ...state, phase: 'question', index: state.index + 1, hinted: false, deadline: action.now + QUESTION_DURATION_MS };
    case 'RESET':
      return { ...initialState, round: state.round + 1 };
    default:
      return state;
  }
}
