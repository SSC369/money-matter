import { createContext, useEffect, useState } from "react";
import { LIGHT_MODE_KEY, THEME_KEY } from "../constants";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(LIGHT_MODE_KEY);

  useEffect(() => {
    const themeFromLocalStorage =
      localStorage.getItem(THEME_KEY) || LIGHT_MODE_KEY;
    setTheme(themeFromLocalStorage);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
