import React, { useEffect } from 'react';
import {
  BaseMsg,
  DataCreateChat, DataCreateComp, DataMsgAdd,
  DBComp, DBMsg, DBUserWithToken, DBChat
} from "../../../api";
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
  //console.log('badcomps', completion)
  const compTitle: string = completion.messages.length > 0
    ? completion.messages[0].content : "No messages yet";

  useEffect(() => {
    console.log('CompListElem')
  }, []);

  return (
    <ListItemButton
      onClick={() => (setActiveComp(completion))}
      disableGutters
      sx={{ m: 0 }}
      key={completion.id}
    >
      <Box display='flex' alignItems='center'>
        <Chat sx={{ mr: 0.5 }} />
        <ListItemText
          sx={{ color: theme.palette.text.primary }}
        >
          {compTitle}
        </ListItemText>
      </Box>
    </ListItemButton>
  );
};

export default CompListElem;
