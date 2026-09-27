import { useEffect, useRef } from 'react';
export function useFocus(key) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus({ preventScroll: true }); }, [key]);
  return ref;
}
