import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  IconButton,
} from "@mui/material";
import {
  AccountCircle, Chat, LightMode, DarkMode, ThreeP, ThreePOutlined
} from "@mui/icons-material";
import { useAuthContext } from "../AuthContext";


interface NavBarProps {
  darkMode: boolean;
  handleThemeChange: () => void;
}



const NavBar = ({ darkMode, handleThemeChange }: NavBarProps) => {
  const { user, logout, autoTokenLogin, isLoading } = useAuthContext();

  useEffect(() => {
    autoTokenLogin();
  }, []);

  return (

    <IconButton color="inherit" onClick={handleThemeChange}>
      {darkMode ? <DarkMode /> : <LightMode />}
    </IconButton>

  );
};

export default NavBar;
