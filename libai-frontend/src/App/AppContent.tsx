import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useLocation, Routes, Route } from 'react-router-dom';
import LogRegPage from '../components/LogRegPage';
import ChatListPage from '../components/ChatListPage';
import ChatPage from '../components/ChatPage';
import TopNav from './TopNav';
import { useAuthContext } from '../App/AuthContext';
import ChatSidebar from '../components/Sidebar';
import apios from '../apios';
import { DBChat, DBComp } from '../api'; // Import DBChat type as required

const AppContent = ({ themeMode, toggleThemeMode, theme }) => {
  const location = useLocation();
  const { user } = useAuthContext();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [chat, setChat] = useState<DBChat | null>(null);
  const [completions, setCompletions] = useState<DBComp[]>([]);
  const [activeComp, setActiveComp] = useState<DBComp | null>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const addCompletion = (completion: DBComp) => {
    setCompletions([...completions, completion]);
  }

  // Completion Modal
  const [showCompModal, setShowCompModal] = useState(false);
  const handleCompModalOpen = () => {
    setShowCompModal(true);
  };
  const handleCompModalClose = () => {
    setShowCompModal(false);
  };



  useEffect(() => {
    if (location.pathname.startsWith('/chat/')) {
      const chatId = location.pathname.split('/')[2];
      apios.get(`/chat/${chatId}`).then((response) => {
        setChat(response.data);
        setCompletions(response.data.completions);
      });
    }
  }, [location]);

  return (
    <Box display="flex">
      {user && location.pathname !== '/' && (
        <ChatSidebar
          chat={chat}
          user={user}
          addCompletion={addCompletion}
          completions={completions}
          activeComp={activeComp}
          setActiveComp={setActiveComp}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          handleCompModalClose={handleCompModalClose}
          handleCompModalOpen = {handleCompModalOpen}
          showCompModal={showCompModal}
        />
      )}
      <Box flex="1">
        <TopNav
          themeMode={themeMode}
          toggleThemeMode={toggleThemeMode}
          theme={theme}
        />
        <Routes>
          <Route path="/" element={<LogRegPage />} />
          <Route path="/chats" element={<ChatListPage />} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AppContent;
