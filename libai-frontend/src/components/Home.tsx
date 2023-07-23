import React from 'react';
import {Link} from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

const Home = () => {
  const { user, setUser } = useAuthContext();

  return (
    <div>
      {user ? (
        <p>Welcome back, {user.email}!</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Home;
