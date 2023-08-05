import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apios from "../../apios";
import { BaseChat, BaseCompletion } from "../../api";
import { useAuthContext } from "../../AuthContext";
import { useChatContext } from "./ChatContext";
import {
  Button,
  Container,
  Typography,
  List,
  Divider,
  Box,
  Grid,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "./CompListElem";
import NewCompModal from "./NewCompModal";
import ChatSidebar from "./ChatSidebar";

const ChatPage = () => {
  const { user } = useAuthContext();
  const { chatId } = useParams<{ chatId: string }>();
  const {
    chat,
    setChat,
    completions,
    setCompletions,
    activeComp,
    setActiveComp,
  } = useChatContext();
  const [showModal, setShowModal] = useState(false);

  const theme = useTheme();

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const addCompletion = (completion: BaseCompletion) => {
    setCompletions([...completions, completion]);
  }

  useEffect(() => {
    apios.get(`/chat/${chatId}`).then((response) => {
      setChat(response.data);
      setCompletions(response.data.completions);
    });
  }, [user, chatId, setChat, setCompletions]);

  if (!chat) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xl" disableGutters>
      <Grid container spacing={1}>
        {user && user.id && (
          <Grid item xs={3}>
            <ChatSidebar
              chat_id={Number(chatId)}
              user_id={user.id}
              addCompletion={addCompletion}
            />
          </Grid>
        )}
        <Grid item xs={9}>
          <Typography variant="h2">{chat.name}</Typography>
          {activeComp && activeComp.id && (
            <pre>
              {JSON.stringify(activeComp.messages, null, 2)}
            </pre>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatPage;
