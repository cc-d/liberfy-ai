import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apios from '../../apios';
import { BaseCompletion } from '../../api';
import { useAuthContext } from '../../AuthContext';
import { useChatContext } from '../ChatPage/ChatContext';
import ChatMessage from './ChatMessage';
import CreateMsgForm from './CreateMessage';

const CompletionPage = () => {
    const { completionId } = useParams<{ completionId: string }>();
    const { user, setUser } = useAuthContext();
    const {
        chat, setChat, completions, setCompletions,
        completion, setCompletion
    } = useChatContext();

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!completion) {
            apios.get(`/completion/${completionId}`)
            .then(response => {
                setCompletion(response.data); // stringify the response to show it as JSON
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [user]);

    if (!completion) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Completion: {completionId}</h1>
            <div className='completion-msgs'>
                {completion && completion.messages &&
                    completion.messages.map((message, index) => {
                        return (
                            <ChatMessage message={message} index={index} />
                        )
                    })
                }
            </div>
            <CreateMsgForm />
        </div>
    );
}

export default CompletionPage;
