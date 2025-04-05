import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);  // User adat állapot

  useEffect(() => {
    console.log("Token frissült:", token); // Ellenőrizd, hogy a token frissül-e
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Itt lekérheted a felhasználói adatokat a token alapján
      axios
        .get("http://localhost:8080/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data); // A felhasználó adatainak beállítása
        })
        .catch((error) => {
          console.error("Hiba a felhasználói adatok lekérésekor:", error);
        });
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setUser(null); // Ha kijelentkezünk, ürítjük a user adatokat
    }
  }, [token]);

  const login = (newToken) => {
    console.log("Bejelentkezési token:", newToken);
    setToken(newToken);
  };

  const logout = () => {
    console.log("Kijelentkezés");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
