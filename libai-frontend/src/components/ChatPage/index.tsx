import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apios from '../../apios';
import { BaseChat } from '../../api';

const ChatPage = () => {
    const { chatId } = useParams<{ chatId: string }>();
    const [chat, setChat] = useState<BaseChat | null>(null);

    useEffect(() => {
        apios.get(`/chats/${chatId}`)
            .then(response => {
                setChat(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [chatId]);

    if (!chat) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{chat.name}</h1>
            {/* Display chat details here */}
        </div>
    );
}

export default ChatPage;
