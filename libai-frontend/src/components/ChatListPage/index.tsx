import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../AuthContext";
import { BaseTokenData, BaseChat, DataCreateChat } from "../../api";
import CreateChat from "./CreateChat";
import apios from "../../apios";
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ChatListPage = () => {
  const { user } = useAuthContext();
  const [chats, setChats] = useState<BaseChat[]>([]);

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
    <Container id="chat-list-page" maxWidth={false}>

      <CreateChat refreshChats={refreshChats} addChat={addChat} />
      <Typography variant="h4" component="h1">Your Chats</Typography>
      <List>
        {chats.map((chat) => (
          <ListItem key={chat.id} divider>
            <ListItemText primary={`Chat: ${chat.name}`}
              secondary={
                <RouterLink to={`/chat/${chat.id}`}>
                  {chat.name}
                </RouterLink>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ChatListPage;
