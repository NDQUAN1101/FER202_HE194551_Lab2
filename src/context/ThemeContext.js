import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create Theme Context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Persistent theme stored in localStorage, defaulting to 'light'
    const [theme, setTheme] = useLocalStorage('app_theme', 'light');

    // Toggle theme between 'light' and 'dark'
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Apply Bootstrap 5 dark mode attribute and body class
    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        document.body.className = `theme-${theme}`;
    }, [theme]);

    const isDarkMode = theme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to consume ThemeContext easily
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeContext;
