import { useLanguage } from '../context/LanguageContext';
import { useCallback } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { QUESTION_DURATION_MS } from '../game/timing';
import '../styles/timer.css';

export default function Timer({ questionId, deadline, onAnswer }) {
  const { t } = useLanguage();
  const expire = useCallback(() => onAnswer(questionId, null), [questionId, onAnswer]);
  const remaining = useCountdown(deadline, expire);
  const urgent = remaining <= 5;
  const fraction = Math.min(1, (remaining * 1000) / QUESTION_DURATION_MS);
  return (
    <div className={`timer${urgent ? ' timer-urgent' : ''}`}>
      <span className="timer-label">{t('Tiempo restante')}</span>
      <span
        className="timer-digits"
        role="timer"
        aria-label={t('{count} segundos restantes', { count: remaining })}
      >
        <span aria-hidden="true">◷ </span>
        {String(remaining).padStart(2, '0')} s
      </span>
      <span className="timer-track" aria-hidden="true">
        <span style={{ transform: `scaleX(${fraction})` }} />
      </span>
      <span className="timer-alert" role="status">
        {urgent ? t('Últimos 5 segundos') : ''}
      </span>
    </div>
  );
}
