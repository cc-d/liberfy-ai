import React, { createContext, useContext, useState, useEffect } from 'react';
import apios from './apios';
import { useNavigate } from 'react-router-dom';
import { BaseUser } from './api';

interface AuthContextProps {
  user: BaseUser | null;
  isLoading: boolean;
  login: (data: {email: string, password: string}) => Promise<void>;
  logout: () => void;
  setUser: (user: BaseUser | null) => void;
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

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (! email && !isLoading) {
      setIsLoading(true);
      apios.post('/user/login', { email })
        .then(response => setUser(response.data))
        .catch(() => setUser(null))
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  const login = async (data: {email: string, password: string}) => {
    setIsLoading(true);
    try {
      const newUser: (BaseUser | null) = await apios.post('/user/login', data).data;
      if ( newUser ) {
        localStorage.setItem('email', newUser.email);
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

  const logout = () => {
    localStorage.removeItem('email');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

