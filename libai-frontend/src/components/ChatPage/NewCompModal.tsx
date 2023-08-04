import React, { FC, FormEvent, ChangeEvent } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, TextField, Paper } from "@mui/material";

interface NewCompModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  sysprompt: string;
}

const NewCompModal: FC<NewCompModalProps> = ({
  open,
  handleClose,
  handleSubmit,
  handleInputChange,
  sysprompt
}) => {
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
