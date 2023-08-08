import React, { FC, FormEvent, ChangeEvent, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, TextField, Paper } from "@mui/material";
import apios from "../../../apios";
import {

  DataCreateChat, DataCreateComp, DataMsgAdd,
  DBComp, DBMsg, DBUserWithToken, DBChat
} from "../../../api";


interface NewCompModalProps {
  open: boolean;
  handleClose: () => void;
  addCompletion: (completion: DBComp) => void;
  chat_id: number;
  user_id: number;
  temperature: number;
}

const NewCompModal: FC<NewCompModalProps> = ({
  open,
  handleClose,
  addCompletion,
  chat_id,
  user_id,
  temperature,
}) => {
  console.log('NewCompModal')
  const [sysprompt, setSysPrompt] = useState("");

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
        chat_id: chat_id,
        sysprompt: sysprompt,
        user_id: user_id,
        temperature: 1,
      })
      .then((response) => {
        if (response && response.data) {
          addCompletion(response.data);
        }
      });
      handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper sx={{ p: 2, minWidth: '300px' }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="temperature"
            label="Temperature"
            value={1}
            disabled
            variant="filled"
            sx={{ width: '100px', mb: 2 }}
          />
          <TextField
            type="text"
            name="sysprompt"
            label="System Prompt"
            value={sysprompt}
            onChange={handleInputChange}
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Create Completion
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default NewCompModal;
