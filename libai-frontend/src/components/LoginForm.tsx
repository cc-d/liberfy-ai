import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apios from '../apios';
import { useAuthContext } from '../AuthContext';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();  // Replaced 'user' with 'login'

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login({ email, password });
    } catch (error) {
      // Handle error...
    }
  };

  // ...

  // Rest of your code
}