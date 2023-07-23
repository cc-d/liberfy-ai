import React, { useState } from 'react';
import apios from '../apios';
import { useAuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();

  const nav = useNavigate();

// LoginForm.tsx
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  try {
    login({ email, password });
  } catch (error) {
    // Handle error...
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
