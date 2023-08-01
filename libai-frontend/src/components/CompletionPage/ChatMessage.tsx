import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apios from '../../apios';
import { BaseCompletion, BaseMessage, BaseChat } from '../../api';
import { useAuthContext } from '../../AuthContext';
import { useChatContext } from '../ChatPage/ChatContext';


interface MessageProps {
    role: string;
    content: string;
}

const ChatMessage = ({ message, index }: { message: BaseMessage, index: number }) => {
    const { user, setUser } = useAuthContext();
    const { chatId } = useParams<{ chatId: string }>();
    const {
        chat, setChat, completions, setCompletions,
        completion, setCompletion
    } = useChatContext();

    const [showForm, setShowForm] = useState(false);
    const [formValues, setFormValues] = useState({
        sysprompt: '',
        temperature: 1,
        chat_id: chat?.id,
        user_id: user?.id
    });

    return (<div className="message-wrapper" key={index}>
        <div className='message-role inner-msg-wrap'>
            <div className='role-title inner-msg-left'>Role:</div>
            <div className='role-content'>{message.role}</div>
        </div>
        <div className="message-content inner-msg-wrap">
            <div className='msg-content-title inner-msg-left'>Content: </div>
            <div className='msg-content'>{message.content}</div>
        </div>
    </div>)
}

export default ChatMessage;