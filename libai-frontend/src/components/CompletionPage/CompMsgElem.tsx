import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { BaseMessage } from "../../api";

const CompMsg = ({
  message,
  index,
}: {
  message: BaseMessage;
  index: number;
}) => {
  return (
    <ListItem>
      <ListItemText
        primary={message.role}
        secondary={message.content}
        className={`message-role-${message.role}`}
      />
    </ListItem>
  );
};

export default CompMsg;
