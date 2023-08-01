import React, { useState } from 'react';
import { useAuthContext } from '../../AuthContext';
import apios from '../../apios';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useAuthContext();
    const nav = useNavigate();

    const handleRegister = async (event: React.FormEvent) => {
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
      <form onSubmit={handleRegister}>
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

        <button type="submit">Register</button>
      </form>
    );

  };
