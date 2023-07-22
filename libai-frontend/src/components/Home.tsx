import React from 'react';
import { useAuth } from '../AuthContext';

const Home = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Welcome!</h1>
      {user ? (
        <p>Welcome back, {user.email}!</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Home;
