// components/NavBar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

const NavBar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav style={{backgroundColor: "#666666"}}>
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
      </ul>
    </nav>
  );
};

export default NavBar;
