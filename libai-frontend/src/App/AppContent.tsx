import React, { useState, useEffect, } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useLocation, Routes, Route, redirect, useNavigate } from 'react-router-dom';
import LogRegPage from '../components/LogRegPage';
import ChatPage from '../components/ChatPage';
import TopNav from './TopNav';
import { useAuthContext } from '../App/AuthContext';
import ChatSidebar from '../components/Sidebar';
import apios from '../utils/apios';
import { DBChat, DBComp } from '../api'; // Import DBChat type as required

const AppContent = ({ themeMode, toggleThemeMode, theme }) => {
  const { user, userLoading, setIsUserLoading } = useAuthContext();
  const [chat, setChat] = useState<DBChat | null>(null);
  const [chats, setChats] = useState<DBChat[]>([]);
  const [activeCompId, setActiveCompId] = useState<number | null>(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isSidebarOpen, setSidebarOpen] = useState(false);


  console.log('AppContent', 'chat', chat, 'activeCompId', activeCompId)


  const refreshChats = () => {
    if (user) {
      const uid = user.id;
      apios
        .get(`/user/${uid}/chats`)
        .then((response) => {
          setChats(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const addChat = (chat: DBChat) => {
    setChats([...chats, chat]);
  };

  const toggleSidebar = (openclose?: boolean) => {
    if (openclose === true || openclose === false) {
      setSidebarOpen(openclose);
    } else {
      setSidebarOpen(!isSidebarOpen);

    }
  };

  const addCompletion = (completion: DBComp) => {
    if (chat && chat.completions) {
      setChat({
        ...chat,
        completions: [...chat.completions, completion]
      })
    }
  }

  const getCompFromId = (cid: number | null) => {
    if (chat && chat.completions) {
      const fComp: DBComp | undefined = chat.completions.find((comp) => comp.id === cid);
      if (fComp) {
        return fComp;
      }
    }
    return null;
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
    if (user) {
      navigate('/chats'); // Redirect user to /chats if they are logged in
    }
    refreshChats();
  }, [user, navigate]); // add navigate as dependency

  useEffect(() => {

  }, [chat, isSidebarOpen ]);


  console.log('chat', chat, 'user', user, 'isSidebarOpen', isSidebarOpen)

  return (
    <Box sx={{
      display: 'flex',
    }}
    >
      {user && isSidebarOpen && (
        <ChatSidebar
          chat={chat}
          user={user}
          addCompletion={addCompletion}
          getCompFromId={getCompFromId}
          activeCompId={activeCompId}
          setActiveCompId={setActiveCompId}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          handleCompModalClose={handleCompModalClose}
          handleCompModalOpen={handleCompModalOpen}
          showCompModal={showCompModal}
          setChat={setChat}
          chats={chats}
          setChats={setChats}
          addChat={addChat}
        />
      )}

      <Box flex="1" sx={{flexGrow: 1, width: isSidebarOpen && !smallScreen ? 'calc(100vw - 240px)' : '100vw',}}
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
        {/* Removed <redirect to='/chats' /> from this line and moved the redirect logic to the useEffect above */}

        <Route path="/chats"
          element={
            <ChatPage
              chat={chat}
              setChat={setChat}
              activeCompId={activeCompId}
              setActiveCompId={setActiveCompId}
              getCompFromId={getCompFromId}
              addCompletion={addCompletion}
            />
          } />

      </Routes>
      </Box>
    </Box>
  );
};

export default AppContent;
