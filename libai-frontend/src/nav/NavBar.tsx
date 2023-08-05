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
import { AccountCircle, Chat, LightMode, DarkMode } from "@mui/icons-material";
import { useAuthContext } from "../AuthContext";
import LoginDropdown from "./LoginDropdown";

type NavLinkProps = LinkProps & {
  to: string;
  linkText: string;
  linkedIcon?: React.ReactNode;
};

interface NavBarProps {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  linkText,
  linkedIcon,
  ...props
}) => {
  const LM: string = linkedIcon ? "0rem" : "1rem";
  return (
    <Link
      component={RouterLink}
      to={to}
      color="inherit"
      underline="none"
      variant="button"
      style={{ marginLeft: LM, marginRight: "1rem" }}
      {...props}
    >
      {linkedIcon ? (
        <Box display="flex" alignItems="center">
          {linkedIcon}
          {linkText}
        </Box>
      ) : (
        linkText
      )}
    </Link>
  );
};

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
    <AppBar position="static">
      <Toolbar disableGutters>
        <NavLink to="/" linkText="Home" />
        {user && !isLoading && (
          <NavLink
            to="/chats"
            linkText="Chats"
            linkedIcon={<Chat sx={{ height: "1rem", width: "1rem", marginRight: "0.2rem" }} />}
          />
        )}
        <Box sx={{ flexGrow: 1 }} />
        {user && !isLoading ? (
          <Box display="flex" alignItems="center">
            <NavLink
              to="#"
              linkText={user.email}
              linkedIcon={<AccountCircle sx={{ height: "1rem", width: "1rem", marginRight: "0.2rem" }} />}
            />
            <LogoutBtn />
          </Box>
        ) : (
          <LoginDropdown />
        )}
        <IconButton color="inherit" onClick={handleThemeChange}>
          {darkMode ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
