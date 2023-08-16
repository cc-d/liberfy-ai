import React, { useState, useEffect, useCallback } from 'react';
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


  const setChatPlusId = (newChat: DBChat | null) => {
    setChat(newChat);
    if (newChat && newChat.id !== null) {
      localStorage.setItem('lastChatId', newChat.id.toString());
    }
  };

  const setCompPlusId = (newCompId: number | null) => {
    setActiveCompId(newCompId);
    if (newCompId !== null) {
      localStorage.setItem('lastCompId', newCompId.toString());
    }
  };


  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isSidebarOpen, setSidebarOpen] = useState(true);


  console.log('AppContent', 'chat', chat, 'activeCompId', activeCompId)

  useEffect(() => {
    const lsChatId = localStorage.getItem('lastChatId');
    const lsCompId = localStorage.getItem('lastCompId');

    if (lsChatId) {
      setCompPlusId(Number(lsChatId));
      // Find the chat object by ID and set it to state
      const foundChat = chats.find(chat => chat.id === Number(lsChatId));
      setChat(foundChat || null);
    }

    if (lsCompId) {
      setCompPlusId(Number(lsCompId));
    }
  }, [chat, chats]);


  const refreshChats = () => {
    if (user && !loading) {
      setLoading(true);
      const uid = user.id;
      apios
        .get(`/user/${uid}/chats`)
        .then((response) => {
          setChats(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
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

  const removeComp = (cid: number | string) => {
    if (chat && chat.completions) {
      const newComps = chat.completions.filter((comp) => comp.id !== cid);
      setChat({
        ...chat,
        completions: newComps
      })
    }
  }

  const removeChat = (cid: number | string) => {
    const newChats = chats.filter((chat) => chat.id !== cid);
    setChats(newChats);
    if (chat && chat.id === cid) {
      setChat(null);
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

  }, [chat, isSidebarOpen, loading]);


  console.log('chat', chat, 'user', user, 'isSidebarOpen', isSidebarOpen,
    'activeCompId', activeCompId, 'chats', chats,
  )

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
          setCompPlusId={setCompPlusId}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          handleCompModalClose={handleCompModalClose}
          handleCompModalOpen={handleCompModalOpen}
          showCompModal={showCompModal}
          setChatPlusId={setChatPlusId}
          chats={chats}
          setChats={setChats}
          addChat={addChat}
          removeComp={removeComp}
          removeChat={removeChat}
        />
      )}

      <Box flex="1" sx={{ flexGrow: 1, width: isSidebarOpen && !smallScreen ? 'calc(100vw - 240px)' : '100vw', }}
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
                chat={chat}
                setCompPlusId={setCompPlusId}
                setChatPlusId={setChatPlusId}
                activeCompId={activeCompId}

                getCompFromId={getCompFromId}
                addCompletion={addCompletion}
              />
            ) : (
              null
            )} />

        </Routes>
      </Box>
    </Box>
  );
};

export default AppContent;
