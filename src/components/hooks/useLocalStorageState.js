import { useState, useEffect } from 'react';

export default function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return defaultValue;

    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        // Return parsed value unless it is empty string
        return parsed !== '' ? parsed : defaultValue;
      } else {
        return defaultValue;
      }
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Optionally, log or handle error
    }
  }, [key, state]);

  return [state, setState];
}
