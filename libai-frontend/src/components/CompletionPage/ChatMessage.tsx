import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apios from "../../apios";
import { BaseCompletion, BaseMessage, BaseChat } from "../../api";
import { useAuthContext } from "../../AuthContext";
import { useChatContext } from "../ChatPage/ChatContext";

const ChatMessage = ({
  message,
  index,
}: {
  message: BaseMessage;
  index: number;
}) => {
  const { user, setUser } = useAuthContext();
  const { chatId } = useParams<{ chatId: string }>();
  const {
    chat,
    setChat,
    completions,
    setCompletions,
    completion,
    setCompletion,
    messages,
    setMessages,
  } = useChatContext();

  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    sysprompt: "",
    temperature: 1,
    chat_id: chat?.id,
    user_id: user?.id,
  });

  const classStr: string = `message-wrapper message-role-${message.role}`;

  return (
    <div className={classStr} key={index}>
      <div className="message-role">{message.role}</div>
      <div className="message-content inner-msg-wrap">
        <div className="msg-content">{message.content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
