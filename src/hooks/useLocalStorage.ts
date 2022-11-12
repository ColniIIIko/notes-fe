import { useState, useEffect } from 'react';

const getStorageData = <T>(key: string) => {
  const savedItem = localStorage.getItem(key) || null;
  return savedItem ? (JSON.parse(savedItem) as T) : null;
};

export const useLocalStorage = <T>(
  key: string
): [T | null, React.Dispatch<React.SetStateAction<T | null>>] => {
  const [value, setValue] = useState<T | null>(() => getStorageData<T>(key));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
