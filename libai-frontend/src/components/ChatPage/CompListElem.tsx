import React from 'react';
import {
  BaseMsg,
  DataCreateChat, DataCreateComp, DataEmailPass, DataMsgAdd,
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
  setActiveComp: (completion: DBComp | null) => void;
}

export const CompListElem: React.FC<CompListElemProps> = ({ completion, theme, setActiveComp }) => {
  const comp: DBComp = completion;
  const compMsgs = comp.messages ? comp.messages : [];
  var compTitle: string = "System Message Not Found";
  if (compMsgs.length > 0) {
    compTitle = compMsgs[0].content;
  }

  return (
    <ListItemButton
      onClick={() => (setActiveComp(completion))}
      disableGutters
      sx={{ m: 0 }}
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
