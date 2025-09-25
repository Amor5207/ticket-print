import { useState, useEffect } from 'react';

// 自定义Hook用于本地存储
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 从本地存储获取初始值
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  // 当值变化时更新本地存储
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}