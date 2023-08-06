import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LogRegPage from '../components/LogRegPage';
import { AuthProvider } from '../AuthContext';
import NavBar from '../nav';
import ChatPage from '../components/ChatPage';
import ChatListPage from '../components/ChatListPage';
import { DBUser } from '../api';

import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import {
  CssBaseline, Container, Box, useMediaQuery, useTheme, IconButton, Divider,
} from '@mui/material';
import {
  AccountCircle, Chat, LightMode, DarkMode, ThreeP, ThreePOutlined, Logout, LogoutOutlined
} from "@mui/icons-material";
import { drawerWidth } from '../components/Sidebar';

// Create a context for the theme
const ThemeContext = createContext({
  darkMode: true,
  toggleThemeMode: () => { },
});
export const TopNav = ({ marginLeft, themeMode, toggleThemeMode }) => {
  return (
    <>
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
    }}
    >
      <Box
        sx={{
          alignSelf: 'flex-end',
          width: '200px', // Set to the desired width
          mr: 2,
        }}
      >
        <IconButton
          color="inherit"
          onClick={toggleThemeMode}
          sx={{}}
        >
          {themeMode === 'dark' ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Box>
    </Box>
    <Divider />
    </>
  );
}




// Make a custom hook for using the theme context
export const useThemeContext = () => useContext(ThemeContext);
const AppContent = ({ themeMode, toggleThemeMode, theme }) => {
  const location = useLocation();
  const showSidebar = location.pathname.startsWith('/chat/');
  const marginLeft = showSidebar ? '240px' : '0px';

  return (
    <Box
      sx={{
        marginLeft: marginLeft,
      }}
    >
      <TopNav
        themeMode={themeMode}
        toggleThemeMode={toggleThemeMode}
        marginLeft={marginLeft}
      />
      <Routes>
        <Route path="/" element={<LogRegPage />} />
        <Route path="/chats" element={<ChatListPage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
      </Routes>
    </Box>
  );
};

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const [navTopUser, setNavTopUser] = useState('')

  const topUserEmail = (uemail: string) => {
    setNavTopUser(uemail)
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
          topUserEmail={topUserEmail}
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
