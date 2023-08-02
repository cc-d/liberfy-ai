import React, { useEffect, useState, createContext } from 'react';
import { useParams } from 'react-router-dom';
import apios from '../../apios';
import { BaseChat, BaseCompletion } from '../../api';
import { useAuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';
import { useChatContext } from './ChatContext';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../nav/NavBack';

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
        console.log('Getting chat information');
        setShowForm(true);
        apios.get(`/chat/${chatId}`)
            .then(response => {
                console.log('Received chat information:', response.data);
                setChat(response.data);
                setCompletions(response.data.completions);
                setFormValues({
                    ...formValues,
                    chat_id: chat?.id,
                    user_id: user?.id
                });
            })
            .catch(error => {
                console.error('Error getting chat information:', error);
            });
    }, [user]);

    useEffect(() => {
        if (chat && chat.id && user && user.id) {
            setShowForm(true);
        }
    }, [chat]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Changing form input:', e.target.name, e.target.value);
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('Submitting form with values:', formValues);
        e.preventDefault();
        apios.post(`/completion/create`, formValues)
            .then(response => {
                console.log('Received response after creating completion:', response.data);
                // update chat state with new conversation
                if (response.data && 'id' in response.data) {
                    let comps = [...completions, response.data];
                    setCompletions(comps); // Update completions list here
                } else {
                    console.error('Received invalid completion data:', response.data);
                }
            })
            .catch(error => {
                console.error('Error creating completion:', error);
            });
    }



    if (!chat) {
        return <div>Loading...</div>;
    }
    return (
        <div id='chat-page-wrap'>
            <BackButton />
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
