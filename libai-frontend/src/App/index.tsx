import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from '../AuthContext';
import ThemeContext from './ThemeContext';
import AppContent from './AppContent';

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const [navTopUstr, setNavTopUstr] = useState('')

  const setTopUserEmail = (uemail: string) => {
    setNavTopUstr(uemail)
  }


  // Create your theme
  const theme = createTheme({
    palette: {
      mode: themeMode, // Here you set light or dark mode
      primary: {
        main: '#1976d2',

      }
      // Add other customizations here...
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider
          setTopUserEmail={setTopUserEmail}
        >
          <AppContent
            themeMode={themeMode}
            toggleThemeMode={toggleThemeMode}
            theme={theme}
          />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
