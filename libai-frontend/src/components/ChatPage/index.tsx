import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apios from "../../apios";
import { BaseChat, BaseCompletion } from "../../api";
import { useAuthContext } from "../../AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { useChatContext } from "./ChatContext";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";

import { QuestionAnswerRounded } from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";

interface CompListElemProps {
  completion: BaseCompletion;
  theme: any;
}

const CompListElem: React.FC<CompListElemProps> = ({ completion, theme }) => {
  const comp: BaseCompletion = completion;
  const compMsgs = comp.messages ? comp.messages : [];
  var compTitle: string = "System Message Not Found";
  if (compMsgs.length > 0) {
    compTitle = compMsgs[0].content;
  }

  return (
    <ListItem
      component={RouterLink}
      to={`/completion/${completion.id}`}
      sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}
      divider
    >
      <ListItemIcon>
        <QuestionAnswerRounded />
      </ListItemIcon>
      <ListItemText>
        {compTitle}
      </ListItemText>
    </ListItem>
  );
};

const ChatPage = () => {
  const { user } = useAuthContext();
  const { chatId } = useParams<{ chatId: string }>();
  const { chat, setChat, completions, setCompletions } = useChatContext();
  const [showForm, setShowForm] = useState(false);
  const [sysprompt, setSysPrompt] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setShowForm(true);
    apios.get(`/chat/${chatId}`).then((response) => {
      setChat(response.data);
      setCompletions(response.data.completions);
    });
  }, [user, chatId, setChat, setCompletions]);

  useEffect(() => {
    if (chat?.id && user?.id) {
      setShowForm(true);
    }
  }, [chat, user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "sysprompt") {
      setSysPrompt(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    apios
      .post(`/completion/create`, {
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
  };

  if (!chat) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h2">{chat.name}</Typography>

      <List
      /*
        sx={{
          "& .MuiListItem-root": { p: 1 },
        }}
      */
        dense={true}
        disablePadding={true}
      >
        <Typography variant="h5">Completions:</Typography>
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

      {showForm && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root, .MuiButtonBase-root": { m: 1, color: 'unset' },
          }}
          mt={2}
        >
          <TextField
            type="text"
            name="sysprompt"
            label="System Prompt"
            value={sysprompt}
            onChange={handleInputChange}
          />
          <TextField
            type="text"
            name="temperature"
            label="Temperature"
            value={1}
            onChange={handleInputChange}
            disabled
          />
          <Button type="submit" variant="contained">
            Create Completion
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ChatPage;
