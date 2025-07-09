/**
 * Theme Utility Functions
 * 
 * This module provides utility functions for theme management,
 * color calculations, and accessibility features.
 */

export type Theme = 'light' | 'dark';

/**
 * Get the current theme from localStorage or system preference
 */
export const getInitialTheme = (): Theme => {
  // Check localStorage first
  const savedTheme = localStorage.getItem('theme') as Theme;
  if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
    return savedTheme;
  }
  
  // Check system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  
  return 'light';
};

/**
 * Apply theme to document root
 */
export const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  
  // Remove existing theme classes
  root.classList.remove('light', 'dark');
  
  // Add new theme class
  root.classList.add(theme);
  
  // Update meta theme-color for mobile browsers
  updateMetaThemeColor(theme);
};

/**
 * Save theme preference to localStorage
 */
export const saveThemePreference = (theme: Theme): void => {
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.warn('Failed to save theme preference:', error);
  }
};

/**
 * Update meta theme-color for mobile browsers
 */
const updateMetaThemeColor = (theme: Theme): void => {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const color = theme === 'dark' ? '#0f172a' : '#ffffff';
  
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', color);
  } else {
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = color;
    document.head.appendChild(meta);
  }
};

/**
 * Listen for system theme changes
 */
export const watchSystemTheme = (callback: (theme: Theme) => void): (() => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    // Only update if no manual preference is saved
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      callback(e.matches ? 'dark' : 'light');
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
};

/**
 * Get contrast ratio between two colors
 * Used for accessibility compliance
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Convert hex color to RGB
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Check if a color combination meets WCAG accessibility standards
 */
export const meetsAccessibilityStandards = (
  foreground: string, 
  background: string, 
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
};

/**
 * Debounce function for theme transitions
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Preload theme assets to prevent flash
 */
export const preloadThemeAssets = (): void => {
  // Preload any theme-specific images or assets
  const themes = ['light', 'dark'];
  
  themes.forEach(theme => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = `/themes/${theme}.css`;
    document.head.appendChild(link);
  });
};

/**
 * Get theme-aware color value
 */
export const getThemeColor = (
  lightColor: string, 
  darkColor: string, 
  currentTheme: Theme
): string => {
  return currentTheme === 'dark' ? darkColor : lightColor;
};

/**
 * Validate theme value
 */
export const isValidTheme = (value: any): value is Theme => {
  return typeof value === 'string' && ['light', 'dark'].includes(value);
};