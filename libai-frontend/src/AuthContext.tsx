import React, { createContext, useContext, useEffect, useState } from 'react';
import apios from './apios';
import { useNavigate } from 'react-router-dom';
import { BaseUserToken, BaseUser } from './api';

interface AuthContextProps {
  user: BaseUser | null;
  isLoading: boolean;
  login: (data: {email: string, password: string}) => Promise<void>;
  logout: () => void;
  setUser: (user: BaseUser | null) => void;
  autoTokenLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<any> = ({children}) => {
  const [user, setUser] = useState<BaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data: {email: string, password: string}) => {
    setIsLoading(true);
    try {
      const response = await apios.post('/user/login', data);
      const newUser: BaseUserToken | undefined = response.data;
      if (newUser) {
        const newToken: string | undefined | null = newUser.token;
        if (newToken) {
          localStorage.setItem('token', newToken);
        }
        setUser(newUser);
      } else {
        localStorage.removeItem('email');
        setUser(null);
      }
    } catch (error) {
      // Handle login error...
    } finally {
      setIsLoading(false);
    }
  };

  const autoTokenLogin = async () => {
    if (!user && !isLoading) {
      const locToken: string|null = localStorage.getItem('token');
      if (locToken) {
        setIsLoading(true);
        try {
            const tokdata = {token: locToken};
            const resp = await apios.post('/user/user_from_token', tokdata);
            const newUser: BaseUserToken | undefined = resp.data;
            if (newUser) {
              setUser(newUser)
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, autoTokenLogin, setUser }}>
      {children}
    </AuthContext.Provider>
  );

};
