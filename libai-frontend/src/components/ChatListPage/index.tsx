import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apios from '../../apios';
import { useAuthContext } from '../../AuthContext';
import { BaseChat } from '../../api';

const ChatListPage = () => {
    const { user } = useAuthContext();
    const [chats, setChats] = useState<BaseChat[]>([]);

    useEffect(() => {
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
    }, [user]);

    return (
        <div>
            <h1>Your Chats</h1>
            {chats.map((chat) => (
                <Link key={chat.id} to={`/chats/${chat.id}`}>
                    {chat.name}
                </Link>
            ))}
        </div>
    );
}

export default ChatListPage;
