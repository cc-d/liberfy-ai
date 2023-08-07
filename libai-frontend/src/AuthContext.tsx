import React, { createContext, useContext, useEffect, useState } from "react";
import apios from "./apios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BaseMsg, Token,
  DataCreateChat, DataCreateComp, DataMsgAdd,
  DBComp, DBMsg, DBChat, DBUserWithToken, DBUser
} from "./api";

interface AuthContextProps {
  user: DBUser | null;
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  login: (data: jwtLoginData) => Promise<void>;
  register: (data: jwtLoginData) => Promise<void>;
  logout: () => void;
  autoTokenLogin: () => Promise<void>;
}

export interface jwtLoginData {
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({setTopUserEmail, children }) => {
  const [user, setUser] = useState<DBUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toDBUser = (userWithToken: DBUserWithToken): DBUser => {
    const { token, ...userWithoutToken } = userWithToken;
    return userWithoutToken;
  };

  const setActiveUser = (user: DBUser) => {
    console.log('setactive', user)
    setTopUserEmail(user.email);
    console.log('setnavtop', user.email)
    setUser(user);
  };

  const login = async (data: jwtLoginData) => {
    try {
      const resp = await apios.post("/user/login", { username: data.username, password: data.password });
      if (resp) {
        const tokUser: DBUserWithToken = resp.data;
        console.log(tokUser, 'tokUser')
        localStorage.setItem("token", tokUser.token.access_token);
        console.log(toDBUser(tokUser));
        setActiveUser(tokUser);
        navigate('/chats')
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async (data: jwtLoginData) => {
    try {
      const resp = await apios.post("/user/register", { username: data.username, password: data.password });
      if (resp) {
        const tokUser: DBUserWithToken = resp.data;
        localStorage.setItem("token", tokUser.token.access_token);
        setActiveUser(toDBUser(tokUser));
        navigate('/chats')
      }
    } catch (error) {
      console.error("Registration error:", error);
    }

  };

  const autoTokenLogin = async () => {
    console.log('autotokenlogin')
    const locToken: string | null = localStorage.getItem("token");
    if (locToken && !user && !isLoading) {
      setIsLoading(true)
      try {
        const resp = await apios.post("/user_from_token", { token: locToken });
        if (resp) {
          const tokUser: DBUserWithToken = resp.data;
          setActiveUser(toDBUser(tokUser));
        }
      } catch (error) {
        console.error("Auto login error:", error);
      } finally {
        setIsLoading(false)
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = '/'
  };

  useEffect(() => {
    autoTokenLogin();
  }, []); // Add auto login on mount

  return (
    <AuthContext.Provider
      value={{
        setUser, user, isLoading, setIsLoading, login,
        register, logout, autoTokenLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
