import { questions } from '../data/questions';
import { shuffle } from './shuffle';
export function buildRound(pool = questions, challenge = 'voices') {
  return shuffle(pool).slice(0, 10).map(question => {
    if (challenge !== 'works') return { ...question, answerKey: question.author, choices: undefined };
    const alternatives = shuffle(questions.filter(item => item.author === question.author && item.id !== question.id)).slice(0, 3);
    return { ...question, answerKey: question.id, choices: shuffle([question, ...alternatives]).map(item => ({ id: item.id, label: item.work })) };
  });
}
