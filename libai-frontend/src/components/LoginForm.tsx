import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apios from '../apios';
import { useAuthContext } from '../AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const useAuthContext = useAuthContext();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await apios.post('/user/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem('email', email);
      }
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
