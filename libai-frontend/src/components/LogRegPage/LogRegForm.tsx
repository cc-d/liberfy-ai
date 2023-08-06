import React, { useState } from "react";
import {
  Button, Box,
  Container,
  TextField,
  Typography,
  Tab,
  Tabs,
  Paper,
  FormHelperText,
  FormLabel,
  InputLabel,
} from "@mui/material";
import { useAuthContext } from "../../AuthContext";


const LogRegForm = ({ formType, onSubmit, onChange }): JSX.Element => {
  const ftype = formType === 'log' ? 'log' : 'reg';

  return (
    <Box
      id={`${ftype}-form`}
      component='form'
      onSubmit={(e) => onSubmit(e, ftype)}
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
      autoComplete='off'
      display='flex'
      flexDirection='column'
    >

      <Typography variant='h5' sx={{ml: 1}}>
        {ftype === 'reg' ? 'Register' : 'Login'}
      </Typography>

      <TextField
        id={`${ftype}-email`}
        label='Email'
        variant='outlined'
        name='username'
        onChange={onChange}
      />

      <TextField
        id={`${ftype}-password`}
        label='Password'
        type='password'
        name='password'
        onChange={onChange}
      />

      <Button
        type="submit"
        variant='contained'
        sx={{
          alignSelf: 'flex-end',
          mr: 1,
        }}
      >
        {ftype === 'log' ? 'Login' : 'Register'}
      </Button>
    </Box>
  );
}

export default LogRegForm;