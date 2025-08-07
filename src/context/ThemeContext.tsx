// ThemeContext.tsx
import { createContext, useContext, useState, type ReactNode, } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LightTheme, DarkTheme } from '../theme/DarkTheme'; // Adjust the import path as necessary

type ThemeMode = 'light' | 'dark';

const ThemeContext = createContext({
  toggleTheme: () => {},
  mode: 'light' as ThemeMode,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = mode === 'light' ? LightTheme : DarkTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
