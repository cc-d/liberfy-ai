import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apios from "../../apios";
import { BaseMessage, BaseChat, BaseCompletion } from "../../api";
import { useAuthContext } from "../../AuthContext";
import { useChatContext } from "../ChatPage/ChatContext";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import ChatMessage from "./CompMsgElem";

interface MessageProps {
  role: string;
  content: string;
}

const CreateMsgForm = () => {
  const { user, setUser } = useAuthContext();
  const { chatId } = useParams<{ chatId: string }>();
  const {
    chat,
    setChat,
    completions,
    setCompletions,
    completion,
    setCompletion,
    messages,
    setMessages,
  } = useChatContext();
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({ content: "", role: "user" });

  const handleInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let compid = -1;
    if (completion && completion.id) {
      compid = completion.id;
    }

    const data = {
      content: formValues.content,
      role: formValues.role,
      completion_id: compid,
    };
    // send a post request to /api/message/add/{completion_id}
    apios
      .post(`/message/add`, data)
      .then((response) => {
        // handle response
        let newMessage: BaseMessage = response.data;

        // Create new array and update state
        let newMsgs: BaseMessage[] = [...messages, newMessage];

        setMessages(newMsgs);

        let newCompletion: BaseCompletion | null = completion;
        if (newCompletion) {
          newCompletion.messages = newMsgs;
          setCompletion(newCompletion);
        }

        // Clear form values
        setFormValues({
          ...formValues,
          content: "",
          role: "user",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <FormControl component="form" onSubmit={handleSubmit} fullWidth={false}>
      <FormLabel component="legend">Create Message</FormLabel>
      <FormGroup>
        <FormControl variant="outlined">
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-input"
            value={formValues.role}
            label="Role"
            name="role"
            onChange={handleInputChange}
          >
            <MenuItem value={"system"}>System</MenuItem>
            <MenuItem value={"assistant"}>Assistant</MenuItem>
            <MenuItem value={"user"}>User</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="content-input"
          label="Content"
          variant="outlined"
          name="content"
          multiline
          rows={4}
          sx={{ width: "25rem" }}
          value={formValues.content}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Message
        </Button>
      </FormGroup>
    </FormControl>
  );
};

export default CreateMsgForm;
