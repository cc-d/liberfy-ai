// components/NavBar.tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

const NavBar = () => {
  const { user, logout, autoTokenLogin } = useAuthContext();

  useEffect(() => {
    autoTokenLogin();
}, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {user ? (
            <>
              <span>Welcome, {user.email}!</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login/Register</Link>
          )}
        </li>
        {user && (
          <li>
            <Link to="/chats">Chats</Link>
          </li>
        )
        }
      </ul>
    </nav>
  );
};

export default NavBar;
