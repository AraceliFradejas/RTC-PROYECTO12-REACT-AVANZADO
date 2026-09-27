import { useLanguage } from '../context/LanguageContext';
import { useCallback } from 'react';
import { useCountdown } from '../hooks/useCountdown';
export default function Timer({ questionId, deadline, onAnswer }) {
  const { t } = useLanguage();
  const expire = useCallback(() => onAnswer(questionId, null), [questionId, onAnswer]);
  const remaining = useCountdown(deadline, expire);
  return <span className={`timer ${remaining <= 5 ? 'timer-urgent' : ''}`} role="timer" aria-label={t('{count} segundos restantes', { count: remaining })}>
    <span aria-hidden="true">◷ </span>{String(remaining).padStart(2, '0')} s
  </span>;
}
