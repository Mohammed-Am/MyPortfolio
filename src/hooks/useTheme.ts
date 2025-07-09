import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Custom hook to access theme context
 * 
 * This hook provides access to the current theme and theme toggle function.
 * It includes error handling to ensure it's used within a ThemeProvider.
 * 
 * @returns {Object} Theme context containing theme state and toggle function
 * @throws {Error} If used outside of ThemeProvider
 * 
 * @example
 * ```tsx
 * const { theme, toggleTheme } = useTheme();
 * 
 * return (
 *   <div className={`app ${theme}`}>
 *     <button onClick={toggleTheme}>
 *       Switch to {theme === 'light' ? 'dark' : 'light'} mode
 *     </button>
 *   </div>
 * );
 * ```
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Make sure to wrap your component tree with <ThemeProvider>.'
    );
  }
  
  return context;
};

export default useTheme;