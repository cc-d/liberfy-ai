import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apios from '../apios';
import { useAuthContext } from '../AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuthContext();

  const handleLogin = async (event: React.FormEvent) => {
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

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await apios.post('/user/register', { email, password });
      if (response.status === 200) {
        localStorage.setItem('email', email);
      }
    } catch (error) {
      // Handle error...
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Log in</button>
        </form>
      </div>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
