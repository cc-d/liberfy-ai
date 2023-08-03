import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import { AuthProvider } from './AuthContext';
import NavBar from './nav/NavBar';
import ChatPage from './components/ChatPage';
import ChatListPage from './components/ChatListPage';
import CompletionPage from './components/CompletionPage';
import ChatProvider from './components/ChatPage/ChatContext';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Create a context for the theme
const ThemeContext = createContext({
  darkMode: false,
  toggleThemeMode: () => {},
});

// Make a custom hook for using the theme context
export const useThemeContext = () => useContext(ThemeContext);


function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

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
          <NavBar darkMode={true ? themeMode == 'dark' : false} handleThemeChange={toggleThemeMode} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/chats" element={<ChatListPage />} />
              <Route path="/chat/:chatId" element={<ChatPage />} />
              <Route path="/completion/:completionId" element={<CompletionPage />} />
            </Routes>
          </ChatProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;