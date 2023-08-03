import React, { createContext, useContext, useEffect, useState } from "react";
import apios from "./apios";
import { useNavigate } from "react-router-dom";
import { BaseUserToken, BaseUser } from "./api";

interface AuthContextProps {
  user: BaseUser | null;
  isLoading: boolean;
  login: (data: { token: string }) => Promise<void>;
  logout: () => void;
  autoTokenLogin: () => Promise<void>;
  setUser: (user: BaseUser | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<BaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (user) {
      console.log("User already logged in");
      return;
    }
  };

  const autoTokenLogin = async () => {
    if (!user && !isLoading) {
      const locToken: string | null = localStorage.getItem("token");
      if (locToken) {
        setIsLoading(true);
        try {
          const resp = await apios.post("/user/user_from_token", {
            token: locToken,
          });
          if (resp) {
            const newUser: BaseUser = resp.data;
            setUser(newUser);
          }
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, logout, login, autoTokenLogin, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
