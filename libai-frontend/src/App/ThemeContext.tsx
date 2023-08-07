import { createContext, useContext } from 'react';

const ThemeContext = createContext({
  darkMode: true,
  toggleThemeMode: () => { },
});

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContext;
