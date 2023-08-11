import React from 'react';
import {
  DataCreateChat, DataCreateComp, DataMsgAdd,
  DBComp, DBMsg, DBUserWithToken, DBChat
} from "../../api";
import { Link as RouterLink } from "react-router-dom";
import {
  ListItem, ListItemIcon, ListItemText,
  Theme, Divider, Box, ListItemButton,
} from "@mui/material";
import { Chat, QuestionAnswerOutlined } from "@mui/icons-material";

interface CompListElemProps {
  completion: DBComp;
  theme: any;
  setActiveCompId;
}

export const CompListElem: React.FC<CompListElemProps> = ({
  completion, theme, setActiveCompId
}) => {
  const compTitle: string = completion.messages.length > 0
    ? completion.messages[0].content : "No messages yet";


  return (
    <>
      {completion && completion.id !== null && (
        <ListItemButton
          onClick={setActiveCompId(completion.id)}
          disableGutters
          sx={{ m: 0 }}
          key={completion.id}
        >
          <Box display='flex'
            alignItems='center'
            sx={{
              color: theme.palette.text.primary,
              width: '100%'
            }}>
            <Chat sx={{ mr: 0.5 }} />
            <ListItemText
              primary={compTitle} primaryTypographyProps={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            />
          </Box>
        </ListItemButton>
      )
      }

    </>
  )
};

export default CompListElem;
