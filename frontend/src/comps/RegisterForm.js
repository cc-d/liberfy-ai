import React, { useState } from 'react';
import apios from '../apios';
import { EmailPassData } from '../api/index';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const resp = await apios.post('/register', {
                email: email,
                password: password,
            });

            alert("Successfully registered");
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <form onSubmit={registerUser}>
            <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email'
                required
            />
            <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
                required
            />
            <button type='submit'>Register</button>
        </form>
    );
};

export default RegisterForm;