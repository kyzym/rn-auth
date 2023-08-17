import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  function authenticate({ token, expiresIn }) {
    console.log(expiresIn);
    setAuthToken(token);
    AsyncStorage.setItem('token', token);

    setTimeout(logout, expiresIn * 1000);
  }

  function logout() {
    AsyncStorage.removeItem('token');
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
