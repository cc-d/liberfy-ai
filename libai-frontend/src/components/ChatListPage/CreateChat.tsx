import React, { useEffect, useState, createContext, useContext, EventHandler, ChangeEvent, FormEvent } from 'react';
import apios from '../../apios';
import { useAuthContext } from '../../AuthContext';
import { BaseChat } from '../../api';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

export interface CreateChatProps {
    refreshChats: () => void;
    addChat: (chat: BaseChat) => void;
}

const CreateChat = ({ refreshChats, addChat }: CreateChatProps) => {
    const { user } = useAuthContext();
    const [name, setName] = useState('');

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (user) {
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
        <Container id='create-chat-form'>
            <Typography variant="h4" component="h1">Create Chat</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    value={name}
                    onChange={handleNameChange}
                    id="outlined-basic"
                    label="Chat Name"
                    variant="outlined"
                    style={{ marginBottom: '15px' }}
                />
                <Button variant="contained" type="submit">Create</Button>
            </Box>
        </Container>
    );
}

export default CreateChat;
