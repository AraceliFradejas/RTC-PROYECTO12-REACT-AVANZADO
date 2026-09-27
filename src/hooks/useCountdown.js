import { useEffect, useState } from 'react';

export function useCountdown(deadline, onExpire) {
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
  useEffect(() => {
    let expired = false;
    const tick = () => {
      const next = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(next);
      if (!next && !expired) {
        expired = true;
        clearInterval(interval);
        onExpire();
      }
    };
    const interval = setInterval(tick, 250);
    tick();
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [deadline, onExpire]);
  return remaining;
}
