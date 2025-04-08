import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Importálás helyesen

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Token mentése helyben
  const [user, setUser] = useState(null);

  // Token dekódolása és felhasználói adatok beállítása
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const decodedUser = jwtDecode(token); // Token dekódolása
        console.log("Dekódolt felhasználó:", decodedUser); // Debugging
        setUser(decodedUser); // Felhasználó adatainak beállítása
      } catch (error) {
        console.error("Érvénytelen token:", error);
        setUser(null); // Token hiba esetén töröljük a felhasználót
        setToken(null); // Ha érvénytelen token, akkor töröljük
        localStorage.removeItem('token'); // Token törlése helyből
      }
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setUser(null); // Ha nincs token, töröljük a felhasználót
    }
  }, [token]);

  // Login függvény
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Token mentése helyben
  };

  // Logout függvény
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Token törlése helyből
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
