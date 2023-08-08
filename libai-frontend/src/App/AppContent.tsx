import React, { useEffect, useMemo, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation, Routes, Route } from 'react-router-dom';
import LogRegPage from '../components/LogRegPage';
import ChatListPage from '../components/ChatListPage';
import ChatPage from '../components/ChatPage';
import TopNav from './TopNav';
import SidebarContext from './SidebarContext';

const AppContent = ({ themeMode, toggleThemeMode, theme }) => {
  console.log('AppContent')
  const location = useLocation();
  const themeObj = useTheme();


  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  //!isSmallDevice && location.pathname.startsWith('/chat/')
  const [isSidebarOpen, setSidebarOpen] = useState(true)


  const showLeftMarg = () => {
    const onChatPage = location.pathname.startsWith('/chat/')
    if (!onChatPage) {
      return false
    }
    if (!isSmallDevice) {
      return true
    } else {
      if (isSidebarOpen) {
        return true
      } else {
        return false
      }
    }

  }

  const getMarg = (): string => {
    let marg: string = showLeftMarg() ? '240px' : '0px';
    /*console.log(
      'marg', marg, 'isSidebarOpen', isSidebarOpen,
      'isSmallDevice', isSmallDevice, 'location.pathname', location.pathname
    )*/
    return marg
  }

  //console.log('getMarg: ' + getMarg())
  // Modify the showSidebar logic to also consider isSidebarOpen
  const [marginLeft, setMarginLeft] = useState(getMarg());


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }


  if (getMarg() !== marginLeft) {
    setMarginLeft(getMarg())
  }


  useEffect(() => {
    //console.log('useeffect marginleft')
    //console.log(location.pathname)
    //console.log(isSmallDevice)
    //console.log(marginLeft)
    setMarginLeft(getMarg())//location.pathname.startsWith('/chat/') ? '240px': '0px')
  }, [isSmallDevice]);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        isSmallDevice,
        marginLeft,
        setMarginLeft
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
          theme={theme}
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
export default AppContent;
