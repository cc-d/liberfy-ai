import React from 'react';
import {Link} from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

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
