import React, { useState } from "react";
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
import { useAuthContext } from "../../AuthContext";
import { DataEmailPass } from "../../api";
import LogRegForm from "./LogRegForm";

const LogRegPage = () => {
  const {
    user, setUser, autoTokenLogin, login, register
  } = useAuthContext();

  const [logForm, setLogForm] = useState({
    email: "",
    password: "",
  });

  const [regForm, setRegForm] = useState({
    email: "",
    password: "",
  });

  return (
      <>
      <Typography variant='h4' ml={1}>
        Login or Register
      </Typography>
      <Box display='flex'>
        <LogRegForm formType='log' />
        <LogRegForm formType='reg' />
      </Box>
      </>

  )

}

export default LogRegPage;