import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage';
import { AuthProvider } from './AuthContext';
import NavBar from './nav/NavBar';
import ChatPage from './components/ChatPage';
import ChatListPage from './components/ChatListPage';
import ChatProvider from './components/ChatPage/ChatContext';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';

// Create a context for the theme
const ThemeContext = createContext({
  darkMode: true,
  toggleThemeMode: () => {},
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

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* CssBaseline helps to normalize CSS styles across different browsers */}
        <AuthProvider>
          <ChatProvider>
          <Container component={Box} id="nav-container" maxWidth={false} disableGutters={true}>
          <NavBar darkMode={true ? themeMode == 'dark' : false} handleThemeChange={toggleThemeMode} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chats" element={<ChatListPage />} />
              <Route path="/chat/:chatId" element={<ChatPage />} />
            </Routes>
            </Container>
          </ChatProvider>

        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;