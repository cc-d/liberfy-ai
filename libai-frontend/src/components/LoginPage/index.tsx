import React from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const LoginPage = () => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />

      <h2>Register</h2>
      <RegisterForm />
    </div>
  );
};

export default LoginPage;