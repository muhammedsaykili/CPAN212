import React, { createContext, useState, useContext } from 'react';
import { authAPI } from '../api'; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      console.log('Logging in with:', { email, password });

      const response = await authAPI.login(email, password); 

      if (response.token) {
        localStorage.setItem('token', response.token);
        console.log('Token saved to localStorage');
      } else {
        console.warn('No token found in response');
      }

      setCurrentUser(response.data);

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      console.log('Registering with:', { name, email, password });

      const userData = { id: '123', email, name };
      setCurrentUser(userData);

      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
