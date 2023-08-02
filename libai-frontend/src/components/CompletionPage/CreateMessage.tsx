import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apios from '../../apios';
import { BaseMessage, BaseChat, BaseCompletion } from '../../api';
import { useAuthContext } from '../../AuthContext';
import { useChatContext } from '../ChatPage/ChatContext';
import ChatMessage from './ChatMessage';

interface MessageProps {
    role: string;
    content: string;
}

const CreateMsgForm = () => {
    const { user, setUser } = useAuthContext();
    const { chatId } = useParams<{ chatId: string }>();
    const {
        chat, setChat, completions, setCompletions,
        completion, setCompletion, messages, setMessages
    } = useChatContext();

    const [showForm, setShowForm] = useState(false);
    const [formValues, setFormValues] = useState({
        content: '',
        role: 'user',
    });

    const handleInputChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let compid = -1;
        if (completion && completion.id) {
            compid = completion.id;
        }

        const data = {
            content: formValues.content,
            role: formValues.role,
            completion_id: compid
        };
        // send a post request to /api/message/add/{completion_id}
        apios.post(`/message/add`, data)
        .then(response => {
            // handle response
            let newMessage: BaseMessage = response.data;

            // Create new array and update state
            let newMsgs: BaseMessage[] = [...messages, newMessage];

            setMessages(newMsgs);

            let newCompletion: BaseCompletion | null = completion;
            if (newCompletion) {
                newCompletion.messages = newMsgs;
                setCompletion(newCompletion);
            }

            // Clear form values
            setFormValues({
                ...formValues,
                content: '',
                role: 'user'
            })
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
                    name="role"
                    value={formValues.role}
                    onChange={handleInputChange}
                />
                <div className='add-msg-content-wrap'>
                    <label className='add-msg-label' htmlFor="content">Content:</label>
                    <textarea
                        name="content"
                        id="content"
                        value={formValues.content}
                        cols={30}
                        rows={10}
                        onChange={handleInputChange}

                        ></textarea>
                </div>
                <button type="submit">Create Message</button>
            </form>
        </div>
    );
}

export default CreateMsgForm;
