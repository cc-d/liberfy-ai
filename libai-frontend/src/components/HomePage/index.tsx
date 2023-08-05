import React from 'react';
import {Link} from 'react-router-dom';
import { useAuthContext } from '../../AuthContext';
import { Typography } from '@mui/material';

const Home = () => {
  const { user, setUser } = useAuthContext();

  return (
    <div>
      {user ? (
        <Typography variant="h1">{user.email}!</Typography>
      ) : (
        <Typography variant="body1">Login to continue</Typography>
      )}
    </div>
  );
};

export default Home;
