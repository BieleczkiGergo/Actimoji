import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const decodedUser = jwtDecode(token);
        console.log("Dekódolt felhasználó:", decodedUser); // Ellenőrzés céljából
        setUser(decodedUser); // Állapot beállítása
      } catch (error) {
        console.error("Érvénytelen token:", error);
        setUser(null); // Ha hiba van a token dekódolásában
        setToken(null);
        localStorage.removeItem('token');
      }
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setUser(null); // Ha nincs token, töröljük a felhasználót is
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); 
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
