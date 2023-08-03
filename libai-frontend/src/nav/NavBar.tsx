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
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useAuthContext } from "../AuthContext";

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
  const LM: string = linkedIcon ? '0rem' : '1rem';
  return (
    <Link
      component={RouterLink}
      to={to}
      color="inherit"
      underline="none"
      variant="body1"
      style={{ marginLeft: LM, marginRight: "1rem" }}
      {...props}
    >
      {linkedIcon ? (
        <>
          {linkedIcon}
          {linkText}
        </>
      ) : (
        <>{linkText}</>
      )}
    </Link>
  );
};

const NavBar = ({ darkMode, handleThemeChange }) => {
  const { user, logout, autoTokenLogin } = useAuthContext();

  useEffect(() => {
    autoTokenLogin();
  }, [user]);

  return (
    <AppBar position="static">
      <Toolbar>
        <NavLink to="/" linkText="Home" />
        {user ? (
          <>
            <NavLink to="/chat" linkText="Chat" />
            <NavLink
              to="#"
              linkText={user.email}
              linkedIcon={<AccountCircle
                sx={{ height: '1rem', width: '1rem' }}
              />}
            />
            <NavLink to="#" linkText="Logout" onClick={logout} />
          </>
        ) : (
          <NavLink
            to="/login"
            linkText="Login/Register"
          />
        )}
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
