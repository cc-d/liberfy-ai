import React, { useState } from 'react';
import { useAuthContext } from '../../AuthContext';
import apios from '../../apios';
import { BaseUser, BaseUserToken, EmailPassData } from '../../api';
import { useNavigate } from 'react-router-dom';

let z: BaseUser

export const LoginForm = () => {
    const { user, setUser } = useAuthContext();
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
        let tokenUser: BaseUserToken = response.data;
        if (tokenUser && tokenUser.token) {
            localStorage.setItem('token', tokenUser.token);
            let u: BaseUser = tokenUser;
            if (u) {
                setUser(u);
            }
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