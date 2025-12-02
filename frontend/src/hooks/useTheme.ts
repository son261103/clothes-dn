import { useState, useEffect } from 'react';
import { getTheme, setTheme, toggleTheme } from '../utils/theme';

export const useTheme = () => {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initialize theme state
    const initialTheme = getTheme();
    setThemeState(initialTheme);
    
    // Set the initial theme on the document
    setTheme(initialTheme);
  }, []);

  const toggle = () => {
    toggleTheme();
    const newTheme = getTheme();
    setThemeState(newTheme);
  };

  const set = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  return { theme, toggle, set };
};