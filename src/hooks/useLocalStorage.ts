import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react'

export default function useLocalStorage<T>(key: string, initialvalue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialvalue === "function") {
      return (initialvalue as () => T)()
    } else {
      return initialvalue
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
  
}
