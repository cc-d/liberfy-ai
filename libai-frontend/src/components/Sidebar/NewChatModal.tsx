import React from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Dialog,
  DialogProps,
} from "@mui/material";

interface NewChatModalProps {
  open: boolean;
  handleClose: () => void;
  handleCreateChat: (newChatName: string) => void; // Define the type for the function
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  open,
  handleClose,
  handleCreateChat,
}) => {
  const [newChatName, setNewChatName] = React.useState("");

  const handleSubmit = () => {
    if (newChatName === "") return;
    handleCreateChat(newChatName);
    setNewChatName("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Chat</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Chat Name"
          type="text"
          fullWidth
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewChatModal;
