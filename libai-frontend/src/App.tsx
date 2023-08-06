import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogRegPage from './components/LogRegPage';
import { AuthProvider } from './AuthContext';
import NavBar from './nav';
import ChatPage from './components/ChatPage';
import ChatListPage from './components/ChatListPage';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, useMediaQuery, useTheme } from '@mui/material';
import { drawerWidth } from './components/ChatPage/Sidebar';

// Create a context for the theme
const ThemeContext = createContext({
  darkMode: true,
  toggleThemeMode: () => { },
});

// Make a custom hook for using the theme context
export const useThemeContext = () => useContext(ThemeContext);


function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Create your theme
  const theme = createTheme({
    palette: {
      mode: themeMode, // Here you set light or dark mode
      primary: {
        main: '#1976d2', // Change to your primary color
      },
      secondary: {
        main: '#dc004e', // Change to your secondary color
      },
      // Add other customizations here...
    },
  });

  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const margLeft: string = matches ? '0px' : '240px';

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* CssBaseline helps to normalize CSS styles across different browsers */}
        <AuthProvider>
          <Box
            sx={{
              marginLeft: margLeft
            }}

          >
            <NavBar darkMode={true ? themeMode == 'dark' : false} handleThemeChange={toggleThemeMode} />
            <Routes>
              <Route path="/" element={<LogRegPage />} />
              <Route path="/chats" element={<ChatListPage />} />
              <Route path="/chat/:chatId" element={<ChatPage />} />
            </Routes>
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;