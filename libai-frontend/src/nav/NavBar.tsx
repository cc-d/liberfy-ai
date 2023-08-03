import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Link, Switch } from '@mui/material';
import { useAuthContext } from '../AuthContext';

interface NavBarProps {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const NavBar = ({ darkMode, handleThemeChange }) => {
  const { user, logout, autoTokenLogin } = useAuthContext();

  useEffect(() => {
    autoTokenLogin();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Link component={RouterLink} to="/" color="inherit" underline="none" variant="h6" style={{flexGrow: 1}}>
          Home
        </Link>
        {user && (
          <Link component={RouterLink} to="/chats" color="inherit" underline="none" variant="h6">
            Chats
          </Link>
        )}
        {user ? (
          <>
            <Typography variant="h6" style={{marginLeft: 'auto'}}>
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
