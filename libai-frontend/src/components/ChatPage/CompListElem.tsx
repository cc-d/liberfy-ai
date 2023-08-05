import React from 'react';
import { BaseCompletion } from "../../api";
import { Link as RouterLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, Theme } from "@mui/material";
import { Chat, QuestionAnswerOutlined } from "@mui/icons-material";
import { useChatContext } from "./ChatContext";

interface CompListElemProps {
  completion: BaseCompletion;
  theme: any;
}

export const CompListElem: React.FC<CompListElemProps> = ({ completion, theme }) => {
  const comp: BaseCompletion = completion;
  const compMsgs = comp.messages ? comp.messages : [];
  var compTitle: string = "System Message Not Found";
  if (compMsgs.length > 0) {
    compTitle = compMsgs[0].content;
  }
  const { activeComp, setActiveComp } = useChatContext();

  const handleClick = () => {
    setActiveComp(comp);
  };

  return (
    <ListItem
      onClick={handleClick}
      sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}
      divider
    >
      <ListItemIcon>
        <QuestionAnswerOutlined />
      </ListItemIcon>
      <ListItemText
        sx={{ color: theme.palette.text.primary }}
      >
        {compTitle}
      </ListItemText>
    </ListItem>
  );
};

export default CompListElem;
