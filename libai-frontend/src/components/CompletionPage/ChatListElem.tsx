import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apios from "../../apios";
import { BaseCompletion, BaseMessage, BaseChat } from "../../api";
import { useAuthContext } from "../../AuthContext";
import { useChatContext } from "../ChatPage/ChatContext";
import ChatMessage from "./ChatMessage";
import './styles.css'

interface MessageProps {
  role: string;
  content: string;
}

const CompMsgListElem = ({ messages }: { messages: BaseMessage[] }) => {
  return (
    <div className="comp-msg-list-elem-wrap">

      {messages &&
        messages.map((message, index) => {
          return (
            <ChatMessage key={message.id} message={message} index={index} />
          );
        })}
    </div>
  );
};

export default CompMsgListElem