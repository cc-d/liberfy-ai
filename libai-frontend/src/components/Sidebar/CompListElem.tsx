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
  Chat, QuestionAnswerOutlined, Check, CheckCircle, Delete as DeleteIcon
} from "@mui/icons-material";
import apios from '../../utils/apios';

interface CompListElemProps {
  completion: DBComp;
  theme: Theme;
  setActiveCompId: (compId: number | null) => any;
  activeCompId: number | null;
  removeComp: (compId: number | string) => any;
}

export const CompListElem: React.FC<CompListElemProps> = ({
  completion, theme, setActiveCompId, activeCompId, removeComp
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

  useEffect(() => {
    console.log('CompListElem useEffect', activeCompId, completion);

  }, [activeCompId]);


  return (
    <>
      {completion && completion.id && (
        <ListItemButton
          onClick={() => setActiveCompId(completion.id)}
          disableGutters

          key={completion.id}
          selected={completion.id === activeCompId ? true : false}
        >
          <Box display='flex'
            alignItems='center'
            sx={{
              color: theme.palette.text.primary,
              width: '100%'
            }}>
            {completion.id === activeCompId ?
              <CheckCircle sx={{ mr: 0.5 }} /> :
              <Chat sx={{ mr: 0.5 }} />
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
