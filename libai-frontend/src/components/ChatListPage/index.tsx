import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apios from '../../apios';
import { useAuthContext } from '../../AuthContext';
import { BaseTokenData, BaseChat, DataCreateChat} from '../../api';
import CreateChat from './CreateChat';

const ChatListPage = () => {
    const { user } = useAuthContext();
    const [chats, setChats] = useState<BaseChat[]>([]);

    const refreshChats = () => {
        if(user){
            const uid = user.id;
            apios.get(`/user/${uid}/chats`)
            .then(response => {
                setChats(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    const addChat = (chat: BaseChat) => {
        setChats([...chats, chat]);
    }

    useEffect(() => {
        refreshChats();
    }, [user]);

    return (
        <div className='chat-list'>
            <CreateChat refreshChats={refreshChats} addChat={addChat} />
            <h1>Your Chats</h1>
            {chats.map((chat) => (
                <div className='chat-list-item' key={chat.id}>
                    <h2 className='chat-h-name'>
                    <Link key={chat.id} to={`/chat/${chat.id}`}>
                        Chat {chat.name}
                    </Link>
                    </h2>
                </div>
            ))}
        </div>
    );
}


export default ChatListPage;
