// ==================================================
// IMPORTS
// ==================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


// ==================================================
// CREATE THEME CONTEXT
// ==================================================

const ThemeContext = createContext();


// ==================================================
// THEME PROVIDER COMPONENT
// ==================================================

export function ThemeProvider({ children }) {

  // ------------------------------------------------
  // Get Initial Theme
  // ------------------------------------------------

  const getInitialTheme = () => {

    // 1️⃣ Check localStorage first
    if (localStorage.theme) {
      return localStorage.theme;
    }

    // 2️⃣ Fallback to system preference
    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
  };


  // ------------------------------------------------
  // State
  // ------------------------------------------------

  const [theme, setTheme] = useState(getInitialTheme);


  // ==================================================
  // APPLY THEME WHEN IT CHANGES
  // ==================================================

  useEffect(() => {

    // Add/remove "dark" class on <html>
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    // Save to localStorage
    localStorage.theme = theme;

  }, [theme]);


  // ==================================================
  // TOGGLE THEME
  // ==================================================

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");


  // ==================================================
  // PROVIDER
  // ==================================================

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}


// ==================================================
// CUSTOM HOOK
// ==================================================

export const useTheme = () =>
  useContext(ThemeContext);