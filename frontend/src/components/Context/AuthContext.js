import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post("http://localhost:8080/profile/refresh-token");
      setToken(response.data.token);
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshToken, 3600 * 1000); // 1 óra
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
