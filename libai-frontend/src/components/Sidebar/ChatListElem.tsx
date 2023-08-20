import React, { useEffect } from 'react';
import {
  ListItemButton, ListItemIcon, ListItemText,
  Theme, Box, IconButton,
} from "@mui/material";
import {
  Chat, ChatBubbleOutline, ChatBubble,
  Delete as DeleteIcon, ThreeP, ThreePOutlined,
} from "@mui/icons-material";
import { DBChat } from '../../api';
import apios from '../../utils/apios';

interface ChatListElemProps {
  chat: DBChat;
  theme: Theme;
  setChatPlusId: (chat: DBChat) => void;
  activeChatId: string | number | null;
  removeChat: (chatId: string | number) => void;
}

const ChatListElem: React.FC<ChatListElemProps> = ({
  chat, theme, setChatPlusId, activeChatId, removeChat,

}) => {
  const chatTitle: string = chat.name;

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await apios.delete(`/chat/${chat.id}/delete`);
      if (response.status === 204) {
        console.log('Chat deleted successfully');
        removeChat(chat.id)
      }
    } catch (error) {
      console.error('An error occurred while deleting the chat: ', error);
    }
  };

  return (
    <>
      {chat && chat.id && (
        <ListItemButton

          onClick={() => setChatPlusId(chat)}
          disableGutters
          sx={{ m: 0, }}
          key={chat.id}
          selected={chat.id === activeChatId ? true : false}
        >
          <Box display='flex'
            alignItems='center'
            sx={{
              color: theme.palette.text.primary,
              width: '100%',
              maxWidth: '100%',
            }}>
            {chat.id === activeChatId ?
              <ThreeP sx={{ mr: 0.5 }} /> :
              <ThreePOutlined sx={{ mr: 0.5 }} />
            }
            <ListItemText
              primary={chatTitle}
              primaryTypographyProps={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            />
            <IconButton
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItemButton>
      )
      }
    </>
  )
};

export default ChatListElem;
