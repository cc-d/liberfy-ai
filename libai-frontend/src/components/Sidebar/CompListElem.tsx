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
import { Chat, QuestionAnswerOutlined } from "@mui/icons-material";

interface CompListElemProps {
  completion: DBComp;
  theme: any;
  setActiveComp: (completion: DBComp ) => void;
}


export const CompListElem: React.FC<CompListElemProps> = ({
  completion, theme, setActiveComp
}) => {
  //console.log('CompListElem')
  //console.log('badcomps', completion)
  const compTitle: string = completion.messages.length > 0
    ? completion.messages[0].content : "No messages yet";

  /*useEffect(() => {
    console.log('useEffect()[] CompListElem')
  }, []);*/

  const test = (c) => {
    console.log('test test', c);
    setActiveComp(c);
  }

  return (
    <ListItemButton
      onClick={() => (test(completion))}
      disableGutters
      sx={{ m: 0 }}
      key={completion.id}
    >
      <Box display='flex'
        alignItems='center'
        sx={{
            color: theme.palette.text.primary,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}>
        <Chat sx={{ mr: 0.5 }} />
        <ListItemText
          sx={{
           }}
        >
          {compTitle}
        </ListItemText>
      </Box>
    </ListItemButton>
  );
};

export default CompListElem;
