import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  Switch,
  Container,
  LinkProps,
  Icon,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import {
  AccountCircle, Chat, LightMode, DarkMode, ThreeP, ThreePOutlined
} from "@mui/icons-material";
import { useAuthContext } from "../AuthContext";
import LoginDropdown from "./LoginDropdown";


interface NavBarProps {
  darkMode: boolean;
  handleThemeChange: () => void;
}


const LogoutBtn = () => {
  const { logout } = useAuthContext();
  return (
    <Button color="inherit" variant="outlined" onClick={logout}>
      Logout
    </Button>
  );
};

const NavBar = ({ darkMode, handleThemeChange }: NavBarProps) => {
  const { user, logout, autoTokenLogin, isLoading } = useAuthContext();

  useEffect(() => {
    autoTokenLogin();
  }, [user]);

  return (

    <IconButton color="inherit" onClick={handleThemeChange}>
      {darkMode ? <DarkMode /> : <LightMode />}
    </IconButton>

  );
};

export default NavBar;
