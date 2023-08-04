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
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "./CompListElem";
import NewCompModal from "./NewCompModal";

const ChatPage = () => {
  const { user } = useAuthContext();
  const { chatId } = useParams<{ chatId: string }>();
  const { chat, setChat, completions, setCompletions } = useChatContext();
  const [showModal, setShowModal] = useState(false);
  const [sysprompt, setSysPrompt] = useState("");
  const theme = useTheme();

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    apios.get(`/chat/${chatId}`).then((response) => {
      setChat(response.data);
      setCompletions(response.data.completions);
    });
  }, [user, chatId, setChat, setCompletions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "sysprompt") {
      setSysPrompt(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    apios
      .post(`/completion/new`, {
        chat_id: chat?.id,
        sysprompt: sysprompt,
        user_id: user?.id,
        temperature: 1,
      })
      .then((response) => {
        if ("id" in response.data) {
          setCompletions([...completions, response.data]);
        }
      });
    handleModalClose();
  };

  if (!chat) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h2">{chat.name}</Typography>
      <List dense={true}>
        <Box display="flex" alignItems="center">
          <Typography variant="h5">Completions:</Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={handleModalOpen}
            sx={{ ml: 2 }} // This adds a margin to the left of the button
            size="small"
          >
            New
          </Button>
        </Box>

        <Divider />

        {completions.length > 0 ? (
          completions.map((completion) => (
            <CompListElem
              key={completion.id}
              completion={completion}
              theme={theme}
            />
          ))
        ) : (
          <Typography variant="body1">No completions yet.</Typography>
        )}
      </List>

      <NewCompModal
        open={showModal}
        handleClose={handleModalClose}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        sysprompt={sysprompt}
      />
    </Container>
  );
};

export default ChatPage;
