import React, { createContext, useContext, useState, useEffect } from 'react';
import apios from './apios';
import { useNavigate } from 'react-router-dom';
import { BaseUser } from './api/';

interface AuthContextProps {
  user: BaseUser | null;
  isLoading: boolean;
  login: (data: {email: string, password: string}) => Promise<void>;
  logout: () => void;
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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    const email = localStorage.getItem('email');
    if (email) {
      const response = await apios.post('/user/login', { email, password: '' });
      return response.data;
    } else {
      return null;
    }
  };

  const login = async (data: {email: string, password: string}) => {
    try {
      localStorage.setItem('email', data.email);
      const user = await fetchCurrentUser();
      if (user) {
        setUser(user.data);
        navigate('/');
      }
    } catch (error) {
      // Handle login error...
    }
  };

  const logout = () => {
    localStorage.removeItem('email');
    setUser(null);
  };

  useEffect(() => {
    if (!user && !isLoading) {
        fetchCurrentUser();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
