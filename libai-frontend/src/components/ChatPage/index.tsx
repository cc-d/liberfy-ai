import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apios from '../../apios';
import { BaseChat } from '../../api';
import { useAuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';

const ChatPage = () => {
    const { user, setUser } = useAuthContext();
    const { chatId } = useParams<{ chatId: string }>();
    const [chat, setChat] = useState<BaseChat | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formValues, setFormValues] = useState({
        sysprompt: '',
        temperature: 1,
        chat_id: chat?.id,
        user_id: user?.id
    });

    useEffect(() => {
        apios.get(`/chat/${chatId}`)
            .then(response => {
                setChat(response.data);
                setFormValues({
                    ...formValues,
                    chat_id: chat?.id,
                    user_id: user?.id
                })
            })
            .catch(error => {
                console.error(error);
            });
    }, [user]);

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
                setChat((prevState: any) => {
                    if (prevState) {
                        return { ...prevState, completions: [...prevState.completions, response.data] };
                    } else {
                        // if prevState is null, return the response data as the new state
                        return { completions: [response.data], id: response.data.chat_id };
                    }
                });
                ;
                // hide the form
                setShowForm(false);
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
            <h1>Chat: {chat.name}</h1>
            <Link to={`/completion/${chat.id}`}>Completions</Link>
            <button onClick={() => setShowForm(true)}>Create Completion</button>
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
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );

}

export default ChatPage;
