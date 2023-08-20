import React, { useEffect } from 'react';
import {
  DataCreateChat, DataCreateComp, DataMsgAdd,
  DBComp, DBMsg, DBUserWithToken, DBChat
} from "../../api";
import { Link as RouterLink } from "react-router-dom";
import {
  ListItem, ListItemIcon, ListItemText, IconButton,
  Theme, Divider, Box, ListItemButton,
} from "@mui/material";
import {
  Chat, QuestionAnswerOutlined, Check, QuestionAnswer, ChatBubble,
  CheckCircle, Delete as DeleteIcon, ChatBubbleOutline,
} from "@mui/icons-material";
import apios from '../../utils/apios';

interface CompListElemProps {
  completion: DBComp;
  theme: Theme;
  setCompPlusId: (compId: number | string | null) => any;
  activeCompId: number | string | null;
  removeComp: (compId: number | string) => any;
}

export const CompListElem: React.FC<CompListElemProps> = ({
  completion, theme, setCompPlusId, activeCompId, removeComp
}) => {
  const compTitle: string = completion.messages.length > 0
    ? completion.messages[0].content : "No messages yet";

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await apios.delete(`/completion/${completion.id}/delete`);
      if (response.status === 204) {
        console.log('Completion deleted successfully');
        // Here, you can also update your local state to remove this completion from the list
        // For example: setCompletions(completions.filter(comp => comp.id !== completion.id));
        removeComp(completion.id);
      }
    } catch (error) {
      console.error('An error occurred while deleting the completion: ', error);
    }
  };


  return (
    <>
      {completion && completion.id && (
        <ListItemButton
          onClick={(e: any) => setCompPlusId(completion.id)}
          disableGutters

          key={completion.id}
          selected={completion.id.toString() === activeCompId?.toString() ? true : false}
        >
          <Box display='flex'
            alignItems='center'
            sx={{
              color: theme.palette.text.primary,
              width: '100%'
            }}>
            {completion.id === activeCompId ?
              <QuestionAnswer sx={{ mr: 0.5 }} /> :
              <QuestionAnswerOutlined sx={{ mr: 0.5 }} />
            }
            <ListItemText
              primary={compTitle} primaryTypographyProps={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            />
            <IconButton
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItemButton>

      )
      }

    </>
  )
};

export default CompListElem;
