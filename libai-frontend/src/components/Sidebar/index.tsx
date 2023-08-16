import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  Typography,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  List,
  IconButton,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import {
  ThreeP,
  ExpandMore,
  Menu
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "./CompListElem";
import NewCompModal from "./NewCompModal";
import { DBComp, DBChat, DBUser } from "../../api";
import apios from '../../utils/apios';
import ChatListElem from './ChatListElem';
import NewChatModal from './NewChatModal';
import './styles.css';

interface ChatSidebarProps {
  chat: DBChat | null;
  user: DBUser;
  addCompletion: (completion: DBComp) => void;
  activeCompId: number | string | null;
  getCompFromId: (id: number) => DBComp | null;
  handleCompModalOpen: () => void;
  handleCompModalClose: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  showCompModal: boolean;
  setChatPlusId: (chat: DBChat | null) => void;
  setCompPlusId: (id: number | string | null) => void;
  chats: DBChat[];
  setChats: Dispatch<SetStateAction<DBChat[]>>;
  addChat: (chat: DBChat) => void;  // New line: Adding new chats to state
  removeChat: (cid: number | string) => void;  // New line: Removing chats from state
  removeComp: (cid: number | string) => void;  // New line: Removing completions from state
}

export const drawerWidth = 240;

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chat, user, addCompletion, activeCompId,
  setCompPlusId, handleCompModalOpen, handleCompModalClose,
  showCompModal, toggleSidebar, isSidebarOpen, setChatPlusId, getCompFromId,
  chats, setChats, addChat, removeChat, removeComp,
}) => {
  const theme = useTheme();
  const sidebarType = useMediaQuery(theme.breakpoints.up('sm'));

  const activeChatId = chat ? chat.id : null;

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const handleChatModalOpen = () => {
    setIsChatModalOpen(true);
  };

  const handleChatModalClose = () => {
    setIsChatModalOpen(false);
  };

  const handleCreateChat = (newChatName: string) => {
    if (user && newChatName) {
      const uid = user.id;
      apios.post(`/chat/new`, {
        name: newChatName,
        user_id: uid,
      })
        .then((response) => {
          addChat(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {

  }, [sidebarType, chat, chats, activeChatId, activeCompId])

  console.log('ChatSidebar')
  return (
    <>
      {user && (
        <NewChatModal
          open={isChatModalOpen}
          handleClose={handleChatModalClose}
          handleCreateChat={handleCreateChat}
        />

      )}
      {chat && chat.id && (
        <NewCompModal
          open={showCompModal} // Control the modal open state
          handleClose={handleCompModalClose}
          addCompletion={addCompletion}
          chat_id={chat.id}
          user_id={user.id}
          temperature={1} // Or whatever temperature value you need
        />
      )
      }

      <Drawer
        variant={sidebarType ? "permanent" : "temporary"}
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >

        <Accordion disableGutters defaultExpanded className='sidebar-accord'>
          <AccordionSummary
            className='sidebar-accord-summary'
            expandIcon={<ExpandMore />}>
            <Typography variant="body1" >Chats</Typography>
          </AccordionSummary>
          <AccordionDetails
            className='sidebar-accord-details'

          >
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleChatModalOpen} // Change this line
                sx={{ mt: -1, mb: 1, width: '100%' }}
                size='small'
              >
                Create Chat
              </Button>
              <Divider />

            </Box>
            <Divider />
            <Box width="100%">
              {chats.length > 0 ? (
                <List dense={true}>
                  {chats.map((chatItem) => (
                    <ChatListElem
                      key={chatItem.id}
                      chat={chatItem}
                      theme={theme}
                      activeChatId={activeChatId}
                      setChatPlusId={setChatPlusId}
                      removeChat={removeChat}
                    />
                  ))}
                </List>

              ) : (
                <Typography variant="body2">No chats available.</Typography>
              )}

            </Box>
          </AccordionDetails>
        </Accordion>

        {chat ? (
          <Accordion disableGutters defaultExpanded className='sidebar-accord'>
            <AccordionSummary className='sidebar-accord-summary' expandIcon={<ExpandMore />}>
              <Typography variant="body1">Completions</Typography>
            </AccordionSummary>
            <AccordionDetails className='sidebar-accord-details'>
              <Button
                variant="contained"
                onClick={handleCompModalOpen} // Open the modal
                sx={{ mt: -1, mb: 1, width: '100%' }}
                size="small"
              >
                New
              </Button>
              <Divider />
              <List dense={true}>
                {chat.completions.length > 0 &&
                  chat.completions.map((completion) => (
                    <CompListElem
                      key={completion.id}
                      completion={completion}
                      theme={theme}
                      setCompPlusId={setCompPlusId}
                      activeCompId={activeCompId}
                      removeComp={removeComp}
                    />
                  ))
                }
              </List>
            </AccordionDetails>
          </Accordion>
        ) : (
          <Typography variant="body1">
            Select a chat to view completions
          </Typography>
        )
        }

      </Drawer >
    </>
  );
};

export default ChatSidebar;
