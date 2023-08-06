import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAuthContext } from '../AuthContext';
import apios from '../apios';
import { OldBaseUser, OldBaseUserToken } from "../api";

const LoginDropdown = () => {
  const { user, setUser, autoTokenLogin } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await apios.post("/user/login", {
        email,
        password,
      });
      if (response?.data && response?.data?.token) {
        const token: string = response.data.token;
        localStorage.setItem("token", token);
        const newUser: OldBaseUser = response.data;
        setUser(newUser);
      }
    } catch (error) {
      // Handle error...
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
      color="inherit"
      onClick={handleOpen}
      variant="outlined"
      >
        login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <form onSubmit={handleLogin}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default LoginDropdown;
