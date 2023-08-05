import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../AuthContext";
import { BaseChat, DataCreateChat } from "../../api";
import CreateChat from "./CreateChat";
import apios from "../../apios";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemAvatar,
  Avatar,
  TypeText,
  Box,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";
import { useThemeContext } from "../../App";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const ChatListPage = () => {
  const { user } = useAuthContext();
  const [chats, setChats] = useState<BaseChat[]>([]);
  const theme = useTheme();

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

  const addChat = (chat: BaseChat) => {
    setChats([...chats, chat]);
  };

  useEffect(() => {
    refreshChats();
  }, [user]);

  return (
    <Container id="chat-list-page" maxWidth="xl" sx={{}}>
      <CreateChat refreshChats={refreshChats} addChat={addChat} />
      <Typography variant="h5" component="h5">
        Your Chats:
      </Typography>
      <List>
        <Divider />
        {chats.map((chat) => (
          <ListItem
            key={chat.id}
            component={RouterLink}
            to={`/chat/${chat.id}`}
            divider
            style={{ color: theme.palette.text.primary }}
            sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}          >
            <ListItemAvatar
            >
              <Avatar
                style={{ backgroundColor: theme.palette.text.primary }}
              >
                <ChatIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>{chat.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ChatListPage;
