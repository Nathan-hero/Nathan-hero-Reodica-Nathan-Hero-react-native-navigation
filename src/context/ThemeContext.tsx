import { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from '../global';

const ThemeContext = createContext<any>(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        theme: dark ? darkTheme : lightTheme,
        dark,
        toggle: () => setDark(!dark),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
