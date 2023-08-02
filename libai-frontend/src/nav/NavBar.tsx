// components/NavBar.tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import apios from '../apios';
import BackButton from './NavBack';

const NavBar = () => {
  const { user, logout, autoTokenLogin } = useAuthContext();

  useEffect(() => {
    autoTokenLogin();
  }, []);

  return (
    <div id='top-nav-wrap'>
      <nav id='top-nav'>

        <Link to="/">Home</Link>

        {user && (
          <Link to="/chats">Chats</Link>
        )
        }

        {user ? (
          <div id='top-user-login-wrap'>

            <span>Welcome, {user.email}!</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">Login/Register</Link>
        )
        }
      </nav>
    </div>

  );
};

export default NavBar;
