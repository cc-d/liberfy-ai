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
  AccountCircle, Chat,
  LightMode, DarkMode, ThreeP, ThreePOutlined, Logout, LogoutOutlined
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from '../components/Sidebar';

// Create a context for the theme
const ThemeContext = createContext({
  darkMode: true,
  toggleThemeMode: () => { },
});

// Make a custom hook for using the theme context
export const useThemeContext = () => useContext(ThemeContext);

export interface SidebarContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isSmallDevice: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebarContext must be used within an SidebarProvider");
  }
  return context;
}



export const TopNav = ({themeMode, toggleThemeMode}) => {
  const {
    isSidebarOpen, toggleSidebar, isSmallDevice
  } = useSidebarContext();
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'pink',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between', // This will push items to the edges
          width: '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'blue',
            flex: '1', // This will take up all the available space
          }}
        >
          {isSmallDevice && (
            <IconButton onClick={toggleSidebar} sx={{ color: 'inherit' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: 'green',
            width: '100px', // Set to the desired width
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
            // This will push items to the right
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




const AppContent = ({themeMode, toggleThemeMode, theme }) => {
  const location = useLocation();
  const themeObj = useTheme();

  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // Modify the showSidebar logic to also consider isSidebarOpen
  const showSidebar = !isSmallDevice || (location.pathname.startsWith('/chat/') && isSidebarOpen);
  const marginLeft = (showSidebar && !isSmallDevice) ? '240px' : '0px';
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        isSmallDevice,
      }}
    >
    <Box
      sx={{
        marginLeft: marginLeft, // This will apply the margin only if the conditions are met
      }}
    >
      <TopNav
        themeMode={themeMode}
        toggleThemeMode={toggleThemeMode}
      />
      <Routes>
        <Route path="/" element={<LogRegPage />} />
        <Route path="/chats" element={<ChatListPage />} />
        <Route path="/chat/:chatId" element={
          <ChatPage />
        } />
      </Routes>
    </Box>
    </SidebarContext.Provider>
  );
};

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const [navTopUser, setNavTopUser] = useState('')

  const setTopUserEmail = (uemail: string) => {
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
