import React, { useEffect } from 'react';
import {
  DataCreateChat, DataCreateComp, DataMsgAdd,
  DBComp, DBMsg, DBUserWithToken, DBChat
} from "../../api";
import { Link as RouterLink } from "react-router-dom";
import {
  ListItem, ListItemIcon, ListItemText,
  Theme, Divider, Box, ListItemButton,
} from "@mui/material";
import { Chat, QuestionAnswerOutlined, Check, CheckCircle } from "@mui/icons-material";

interface CompListElemProps {
  completion: DBComp;
  theme: Theme;
  setActiveCompId: (compId: number | null) => any;
  activeCompId: number | null;
}

export const CompListElem: React.FC<CompListElemProps> = ({
  completion, theme, setActiveCompId, activeCompId
}) => {
  const compTitle: string = completion.messages.length > 0
    ? completion.messages[0].content : "No messages yet";

  useEffect(() => {
    console.log('CompListElem useEffect', activeCompId, completion);

  }, [activeCompId]);
  return (
    <>
      {completion && completion.id && (
        <ListItemButton
          onClick={() => setActiveCompId(completion.id)}
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
          </Box>
        </ListItemButton>
      )
      }

    </>
  )
};

export default CompListElem;
