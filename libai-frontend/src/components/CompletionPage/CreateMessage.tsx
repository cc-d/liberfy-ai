import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apios from '../../apios';
import { BaseMessage, BaseChat } from '../../api';
import { useAuthContext } from '../../AuthContext';
import { useChatContext } from '../ChatPage/ChatContext';
import ChatMessage from './ChatMessage';

const CreateMsgForm = () => {
    const { user, setUser } = useAuthContext();
    const { chatId } = useParams<{ chatId: string }>();
    const {
        chat, setChat, completions, setCompletions,
        completion, setCompletion
    } = useChatContext();

    const [showForm, setShowForm] = useState(false);
    const [formValues, setFormValues] = useState({
        sysprompt: 'user',
        temperature: 1,
        chat_id: chat?.id,
        user_id: user?.id
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // send a post request to /api/message/add/{completion_id}
        apios.post(`/api/message/add/${completion?.id}`, formValues)
        .then(response => {
            // handle response
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div id='create-msg-form-wrap'>
            <form onSubmit={handleSubmit}>
            <label className='add-msg-label' htmlFor="msguser">User:</label>
                <input
                    type="text"
                    name="msguser"
                    value={formValues.sysprompt}
                    onChange={handleInputChange}
                />
                <label className='add-msg-label' htmlFor="temperature">Temperature:</label>
                <input
                    type="number"
                    name="temperature"
                    value={formValues.temperature}
                    onChange={handleInputChange}
                    style={{ width: '32px' }}
                />
                <div className='add-msg-content-wrap'>
                    <label className='add-msg-label' htmlFor="msgcontent">Content:</label>
                    <textarea name="msgcontent" id="msgcontent" cols={30} rows={10}></textarea>

                </div>
                <button type="submit">Create Message</button>
            </form>
        </div>
    );
}

export default CreateMsgForm;
