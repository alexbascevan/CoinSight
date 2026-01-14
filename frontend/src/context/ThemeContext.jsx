/**
 * ThemeContext
 * ------------
 * Provides global light/dark theme state management for the CoinSight frontend.
 * 
 * Responsibilities:
 * - Stores the current theme (light or dark)
 * - Persists theme preference in localStorage
 * - Applies Tailwind CSS dark mode by toggling the `dark` class on the root HTML element
 * 
 * Usage:
 * - Wrap the application with ThemeProvider in index.js
 * - Access theme state and toggle function via the useTheme() hook
 */


import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
