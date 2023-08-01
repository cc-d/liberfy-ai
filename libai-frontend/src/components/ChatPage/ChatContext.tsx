import React, { useEffect, useState, createContext } from 'react';
import { useParams } from 'react-router-dom';
import apios from '../../apios';
import { BaseChat, BaseCompletion } from '../../api';
import { useAuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';

interface ChatContextProps {
    chat: BaseChat | null;
    completions: BaseCompletion[];
    completion: BaseCompletion | null;
    setChat: (chat: BaseChat | null) => void;
    setCompletions: (completions: BaseCompletion[]) => void;
    setCompletion: (completion: BaseCompletion | null) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChatContext = () => {
    const context = React.useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}

export const ChatProvider: React.FC<any> = ({ children }) => {
    const [chat, setChat] = useState<BaseChat | null>(null);
    const [completions, setCompletions] = useState<BaseCompletion[]>([]);
    const [completion, setCompletion] = useState<BaseCompletion | null>(null);
    return (
        <ChatContext.Provider value={{chat, completions, setChat, setCompletions, completion, setCompletion}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;