import React, { useEffect, useState } from "react";
import {
  Button, Box,
  Container,
  TextField,
  Typography,
  Tab,
  Tabs,
  Paper,
  Divider,
} from "@mui/material";
import { useAuthContext, jwtLoginData } from "../../AuthContext";
import LogRegForm from "./LogRegForm";
import { useNavigate } from "react-router-dom";

const LogRegPage = () => {
  const {
    login, register, user, logout, autoTokenLogin, isLoading,
  } = useAuthContext();

  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      nav('/chats')
    }
  })

  const [logForm, setLogForm] = useState({
    username: "",
    password: "",
  });

  const [regForm, setRegForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, formType) => {
    const { name, value } = event.target;
    if (formType === 'log') {
      setLogForm({ ...logForm, [name]: value });
    } else {
      setRegForm({ ...regForm, [name]: value });
    }
  };

  const handleSubmit = (event, formType) => {
    event.preventDefault();
    if (formType === 'log') {
      login(logForm);
    } else {
      register(regForm);
    }
  };

  return (
    <Container maxWidth='md'>

      <Typography variant='h4' ml={1}>
        Login or Register
      </Typography>
      <Box display='flex'>
        <LogRegForm formType='log' onSubmit={handleSubmit} onChange={(e) => handleChange(e, 'log')} />
        <LogRegForm formType='reg' onSubmit={handleSubmit} onChange={(e) => handleChange(e, 'reg')} />
      </Box>
    </Container>
  );
};

export default LogRegPage;