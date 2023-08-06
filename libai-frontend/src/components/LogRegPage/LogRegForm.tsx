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
import { DataEmailPass } from "../../api";


const LogRegForm = ({ formType }): JSX.Element => {
  console.log(formType, 'formType')

  const ftype: string = formType === 'log' ? 'log' : 'reg'
  console.log(ftype, 'ftype')
  return (
    <Box
      id={`${ftype}-form`}
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
      autoComplete='off'
      display='flex'
      flexDirection='column'
      >

      <Typography variant='h5' sx={{ml: 1}}>
        {ftype == 'reg' ? 'Register' : 'Login'}
      </Typography>

      <TextField
        id={`${ftype}-email`}
        label='Email'
        variant='outlined'
      />

      <TextField
        id={`${ftype}-password`}
        label='Password'
      />

      <Button
        variant='contained'
        sx={{
          alignSelf: 'flex-end',
          mr: 1,
        }}
      >
        {ftype === 'log' ? 'Login' : 'Register'}
      </Button>
    </Box>

  )
}

export default LogRegForm;