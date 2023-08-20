import React, { useState, useEffect, useCallback } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useLocation, Routes, Route, redirect, useNavigate } from 'react-router-dom';
import LogRegPage from '../components/LogRegPage';
import ChatPage from '../components/ChatPage';
import TopNav from './TopNav';
import { useAuthContext } from '../App/AuthContext';
import apios from '../utils/apios';
import { DBChat, DBComp } from '../api'; // Import DBChat type as required

const AppContent = ({ themeMode, toggleThemeMode, theme }) => {
  const { user, userLoading, setIsUserLoading } = useAuthContext();


  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = (openclose?: boolean) => {
    if (openclose === true || openclose === false) {
      setSidebarOpen(openclose);
    } else {
      setSidebarOpen(!isSidebarOpen);

    }
  };


  useEffect(() => {
    if (user) {
      navigate('/chats'); // Redirect user to /chats if they are logged in
    }
  }, [user, navigate]); // add navigate as dependency

  return (
    <Box sx={{

    }}
    >
      <TopNav
        theme={theme}
        themeMode={themeMode}
        toggleThemeMode={toggleThemeMode}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        smallScreen={smallScreen}
      />

      <Routes>
        <Route path="/" element={!user ? <LogRegPage /> : null} />
        <Route path="/chats"
          element={user && !loading ? (
            <ChatPage
              user={user}
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
              smallScreen={smallScreen}
            />
          ) : (
            null
          )} />

      </Routes>
    </Box>
  );
};

export default AppContent;
