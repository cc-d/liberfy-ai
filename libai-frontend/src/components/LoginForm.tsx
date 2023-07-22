import React, { useState } from 'react';
import apios from '../apios';
import { useAuth } from '../AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await apios.post('/token_login', { email, password });
      login(response.data.token);
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
