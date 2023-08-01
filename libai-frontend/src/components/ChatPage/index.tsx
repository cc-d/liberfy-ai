import React, { useEffect, useState, createContext } from 'react';
import { useParams } from 'react-router-dom';
import apios from '../../apios';
import { BaseChat, BaseCompletion } from '../../api';
import { useAuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';
import { useChatContext } from './ChatContext';

const ChatPage = () => {
    const { user, setUser } = useAuthContext();
    const { chatId } = useParams<{ chatId: string }>();

    const {chat, setChat, completions, setCompletions, completion, setCompletion} = useChatContext();

    const [showForm, setShowForm] = useState(false);
    const [formValues, setFormValues] = useState({
        sysprompt: '',
        temperature: 1,
        chat_id: chat?.id,
        user_id: user?.id
    });

    useEffect(() => {
        setShowForm(true);
        apios.get(`/chat/${chatId}`)
            .then(response => {
                setChat(response.data);
                setCompletions(response.data.completions);
                setFormValues({
                    ...formValues,
                    chat_id: chat?.id,
                    user_id: user?.id
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, [user]);

    useEffect(() => {
        if (chat && chat.id && user && user.id) {
            setShowForm(true);
        }
    }, [chat]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        apios.post(`/completion/create`, formValues)
            .then(response => {
                // update chat state with new conversation
                let newComps = Array(completion);
                completions.forEach((c) => {
                    newComps.push(c);
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    if (!chat) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1 className='chat-h-name'>Chat: {chat.name}</h1>
            <div className='completions-list'>
                {completions.map((completion) => (
                    <div key={completion.id}>
                        <Link to={`/completion/${completion.id}`}>{JSON.stringify(completion)}</Link>
                    </div>
                ))}
            </div>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <label>
                        System Prompt:
                        <input type="text" name="sysprompt" value={formValues.sysprompt} onChange={handleInputChange} />
                    </label>
                    <label>
                        Temperature:
                        <input type="text" name="temperature" value={formValues.temperature} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Create Completion</button>
                </form>
            )}
        </div>
    );

}

export default ChatPage;
