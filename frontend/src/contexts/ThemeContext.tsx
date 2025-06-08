import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

/** Supported theme types */
export type Theme = 'light' | 'dark';

/**
 * Context interface for theme management
 */
interface ThemeContextType {
  /** Current active theme */
  theme: Theme;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook to access theme context
 * @returns Theme context with current theme and toggle function
 * @throws Error if used outside of ThemeProvider
 */

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Props for the ThemeProvider component
 */
interface ThemeProviderProps {
  /** Child components to provide theme context to */
  children: ReactNode;
}

/**
 * Theme provider component that manages application-wide theme state
 * Automatically detects system preference and persists theme choice in localStorage
 */

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('dachshund-theme') as Theme;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem('dachshund-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}