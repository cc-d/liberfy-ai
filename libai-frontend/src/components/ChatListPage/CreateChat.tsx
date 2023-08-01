import React, { useEffect, useState, createContext, useContext, EventHandler, ChangeEvent, FormEvent} from 'react';
import apios from '../../apios';
import { useAuthContext } from '../../AuthContext';
import { BaseChat } from '../../api';

export interface CreateChatProps {
    refreshChats: () => void;
    addChat: (chat: BaseChat) => void;
}

const CreateChat = ({ refreshChats, addChat }) => {
    const { user } = useAuthContext();
    const [name, setName] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(user){
            const uid = user.id;
            apios.post(`/chat/new`, {
                name: name,
                user_id: uid
            })
            .then(response => {
                setName('');
                // TODO: handle response (e.g. show success message)
                addChat(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    return (
        <div id='create-chat-form'>
            <h1>Create Chat</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={handleNameChange} placeholder="Chat Name"/>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateChat;