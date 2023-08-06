import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  EventHandler,
  ChangeEvent,
  FormEvent,
} from "react";
import apios from "../../apios";
import { useAuthContext } from "../../AuthContext";
import {
  BaseMsg,
  DataCreateChat, DataCreateComp, DataMsgAdd,
  DBComp, DBMsg, DBUserWithToken, DBChat
} from "../../api";

import { Box, TextField, Button, Typography, Container, Divider } from "@mui/material";

export interface CreateChatProps {
  refreshChats: () => void;
  addChat: (chat: DBChat) => void;
}

const CreateChat = ({ refreshChats, addChat }: CreateChatProps) => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (user) {
      const uid = user.id;
      apios.post(`/chat/new`, {
          name: name,
          user_id: uid,
        })
        .then((response) => {
          setName("");
          // TODO: handle response (e.g. show success message)
          addChat(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
      <Box id="create-chat-form"
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        mb={2}
      >
        <Typography variant="h5"  component="h5">Create a New Chat</Typography>
        <TextField
          required
          value={name}
          onChange={handleNameChange}
          id="chat-create-textarea"
          label="New Chat Name"
          variant="standard"
          helperText="creates a system message"
          defaultValue=""
          style={{ margin: "4px" }}
          size="small"
        />
        <Button variant="contained" size="small" type="submit" style={{ marginTop: "1rem" }}>
          Create
        </Button>
      </Box>
  );
};

export default CreateChat;
