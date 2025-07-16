import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type UseLocalStorageStateReturn<T> = [T, Dispatch<SetStateAction<T>>]

export default function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): UseLocalStorageStateReturn<T> {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue

    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) && JSON.parse(stored) !== '' ? JSON.parse(stored) : defaultValue : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // Optionally, log or handle error
    }
  }, [key, state])

  return [state, setState]
}
