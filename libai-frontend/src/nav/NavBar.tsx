import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Link, Switch, Container } from '@mui/material';
import { useAuthContext } from '../AuthContext';

interface NavBarProps {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const NavBar = ({ darkMode, handleThemeChange }) => {
  const { user, logout, autoTokenLogin } = useAuthContext();

  useEffect(() => {
    autoTokenLogin();
  }, [user]);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Link component={RouterLink} to="/" color="inherit" underline="none" variant="h6">
          Home
        </Link>

        {user ? (
          <>
          <Link component={RouterLink} to="/chats" color="inherit" underline="none" variant="h6" style={{marginLeft: '1rem'}}>
            Chats
          </Link>
            <Typography variant="h6">
              Welcome, {user.email}!
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Link component={RouterLink} to="/login" color="inherit" underline="none" variant="h6">
            Login/Register
          </Link>
        )}
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
