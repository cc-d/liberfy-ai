import React, { useState } from 'react';
import apios from '../../utils/apios';
import {
  DBMsg, DBComp, DBUserWithToken, DBChat, DataCreateChat, DataCreateComp, DataMsgAdd
} from '../../api';
import {
  Dialog, DialogTitle, DialogContent, Divider,
  DialogActions, Select, MenuItem, FormControl,
  InputLabel, TextField, Button, TextareaAutosize, Input, SelectChangeEvent
} from '@mui/material';


interface AddEditMsgModalProps {
  isOpen: boolean;
  handleClose: () => void;
  msg: DBMsg | null;
  chat_id: number;
  completion_id: number;
  addMsg: (msg: DBMsg) => void;
}


const AddEditMsgModal: React.FC<AddEditMsgModalProps> = (
  { isOpen, handleClose, msg, chat_id, completion_id, addMsg }
) => {
  const [msgContent, setMsgContent] = useState(
    msg && msg.content ? msg.content : ''
  );
  const [msgRole, setMsgRole] = useState(
    msg && msg.role ? msg.role : 'user'
  );

  const handleRoleChange = (e) => {
    setMsgRole(e.target.value as string);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsgContent(e.target.value);
  };
  const [loading, isLoading] = useState(false);

  const handleSubmit = (e) => {
    console.log('clicke', e)
    e.preventDefault();
    const data: DataMsgAdd = {
      content: msgContent,
      role: msgRole,
      completion_id: completion_id,
    };
    isLoading(true);
    apios.post(`/completion/${completion_id}/messages/add`, data)
      .then((resp) => {
        if (resp && resp?.data) {
          addMsg(resp.data);
          handleClose();
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      <DialogTitle>
        Add/Edit Message
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel variant='standard'>Role</InputLabel>
          <Select
            variant='standard'
            sx={{ mb: 1, maxWidth: '20ch' }}
            onChange={(e) => handleRoleChange(e)}
            value={msgRole}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="system">System</MenuItem>
            <MenuItem value="assistant">Assistant</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant='outlined'
          multiline
          fullWidth
          minRows={3}
          placeholder="enter message content"
          value={msgContent}
          onChange={handleContentChange}
          sx={{ mt: 0 }}
        />

        <Button
          type='submit'
          variant='contained'
          size='small'
          sx={{ mt: 1 }}
          onClick={handleSubmit}
        >
          Save Message
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddEditMsgModal;