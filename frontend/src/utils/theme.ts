/**
 * Utility functions for theme management
 */

/**
 * Sets the theme for the application
 * @param theme - 'light', 'dark', or 'auto'
 */
export const setTheme = (theme: 'light' | 'dark' | 'auto'): void => {
  // If 'auto', use system preference
  if (theme === 'auto') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply the theme to the root element
  document.documentElement.setAttribute('data-theme', theme);
  
  // Store the user's preference in localStorage
  localStorage.setItem('theme', theme);
};

/**
 * Gets the current theme
 * @returns The current theme ('light' or 'dark')
 */
export const getTheme = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return systemPrefersDark ? 'dark' : 'light';
};

/**
 * Toggles between light and dark themes
 */
export const toggleTheme = (): void => {
  const currentTheme = getTheme();
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
};

/**
 * Initialize theme based on user preference or system setting
 */
export const initTheme = (): void => {
  const theme = getTheme();
  setTheme(theme);
};

// Listen for changes in system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't set a specific preference
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}