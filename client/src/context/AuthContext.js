import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken, refreshToken, setRefreshToken }}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };