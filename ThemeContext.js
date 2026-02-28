import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockSiteSettings } from '../mock';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(mockSiteSettings.theme);

  useEffect(() => {
    // Apply theme to CSS variables
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', theme.accentColor);
  }, [theme]);

  const updateTheme = (newTheme) => {
    setTheme({ ...theme, ...newTheme });
    // MOCK - Replace with API call to save theme
    console.log('Theme updated:', newTheme);
  };

  const value = {
    theme,
    updateTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};