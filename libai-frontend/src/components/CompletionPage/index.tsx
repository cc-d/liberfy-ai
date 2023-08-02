import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apios from '../../apios';
import { BaseCompletion, BaseMessage, BaseChat } from '../../api';
import { useAuthContext } from '../../AuthContext';
import { useChatContext } from '../ChatPage/ChatContext';
import ChatMessage from './ChatMessage';
import CreateMsgForm from './CreateMessage';

interface MessageProps {
    role: string;
    content: string;
}

const CompletionPage = () => {
    const { completionId } = useParams<{ completionId: string }>();
    const { user, setUser } = useAuthContext();
    const {
        chat, setChat, completions, setCompletions,
        completion, setCompletion, messages, setMessages
    } = useChatContext();

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        console.log('User effect triggered');
        if (!completion) {
            console.log('No completion, making request...');
            apios.get(`/completion/${completionId}`)
            .then(response => {
                console.log('Response received:', response);
                setCompletion(response.data); // stringify the response to show it as JSON
            })
            .catch(error => {
                console.error('Error encountered:', error);
            });
        }
    }, [user]);

    useEffect(() => {
        console.log('Completion effect triggered');
        if (completion && completion.messages) {
            console.log('Setting messages:', completion.messages);
            setMessages(completion.messages);
        }
    }, [completion]);

    useEffect(() => {
        console.log('Messages effect triggered');
            console.log('Setting messages:', messages);
            setMessages(messages);
    }, [messages]);

    if (!messages) {
        console.log('No messages available, showing loading...');
        return <div>Loading...</div>;
    }

    const newMessages = (messages: Array<BaseMessage>) => {
        console.log('New messages triggered with:', messages);
        let newCompMsgs: BaseMessage[] = [];
        if (completion && completion.messages) {
            console.log('Iterating over existing completion messages...');
            completion.messages.forEach((message) => {
                newCompMsgs.push(message);
            })
        }
        console.log('Iterating over new messages...');
        messages.forEach((message) => {
            newCompMsgs.push(message);
        });

        if (completion && completion.messages && newCompMsgs) {
            let newComp = completion;
            newComp.messages = newCompMsgs;
            console.log('Setting messages:', newCompMsgs);
            setMessages(newCompMsgs);

            console.log('Setting completion with new messages');
            setCompletion({
                ...completion, messages: newCompMsgs
            })
        }
    }

    return (
        <div>
            <CreateMsgForm />
            <h1>Completion: {completionId}</h1>
            <div className='completion-msgs'>
                {messages && messages.map((message, index) => {
                        return (
                            <ChatMessage key={message.id} message={message} index={index} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default CompletionPage;
