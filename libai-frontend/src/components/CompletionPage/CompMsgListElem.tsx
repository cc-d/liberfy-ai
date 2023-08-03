import React from "react";
import { List } from "@mui/material";
import { BaseMessage } from "../../api";
import ChatMessage from "./CompMsgElem";

interface MessageProps {
  role: string;
  content: string;
}

const CompMsgListElem = ({ messages }: { messages: BaseMessage[] }) => {
  return (
    <List>
      {messages?.map((message, index) => (
        <ChatMessage key={message.id} message={message} index={index} />
      ))}
    </List>
  );
};

export default CompMsgListElem;
