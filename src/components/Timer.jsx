import { useCallback } from 'react';
import { useCountdown } from '../hooks/useCountdown';
export default function Timer({ questionId, deadline, onAnswer }) {
  const expire = useCallback(() => onAnswer(questionId, null), [questionId, onAnswer]);
  const remaining = useCountdown(deadline, expire);
  return <span className={`timer ${remaining <= 5 ? 'timer-urgent' : ''}`} role="timer" aria-label={`${remaining} segundos restantes`}>
    <span aria-hidden="true">◷ </span>{String(remaining).padStart(2, '0')} s
  </span>;
}
