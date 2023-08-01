import React, { useState } from 'react';
import { useAuthContext } from '../../AuthContext';
import apios from '../../apios';
import { BaseUser, EmailPassData } from '../../api';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');;
    const nav = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        const response = await apios.post('/user/login', {
            email,
            password,
        });
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            window.location.href = '/'
        }
      } catch (error) {
        // Handle error...
      }
    };

    return (
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    );
  };
