import React from 'react';
import {
  Link as RouterLink,
} from "react-router-dom";
import {
  ListItemButton, ListItemIcon, ListItemText,
  Theme, Box,
} from "@mui/material";
import { Chat, ChatBubbleOutline, ChatBubble } from "@mui/icons-material";
import { DBChat } from '../../api';

interface ChatListElemProps {
  chat: DBChat;
  theme: Theme;
  setChat: (chat: DBChat) => void;
  activeChatId: string | number | null;
}

const ChatListElem: React.FC<ChatListElemProps> = ({
  chat, theme, setChat, activeChatId
}) => {
  const chatTitle: string = chat.name;

  return (
    <>
      {chat && chat.id && (
        <ListItemButton
          component={RouterLink}
          to={`/chat/${chat.id}`}
          onClick={() => setChat(chat)}
          disableGutters
          sx={{ m: 0 }}
          key={chat.id}
        >
          <Box display='flex'
            alignItems='center'
            sx={{
              color: theme.palette.text.primary,
              width: '100%',
              maxWidth: '100%',
            }}>
            {chat.id === activeChatId ?
              <ChatBubble sx={{ mr: 0.5 }} /> :
              <ChatBubbleOutline sx={{ mr: 0.5 }} />
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
          </Box>
        </ListItemButton>
      )
      }
    </>
  )
};

export default ChatListElem;
