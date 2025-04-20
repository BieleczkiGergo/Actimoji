import React, { createContext, useContext, useState, useEffect } from "react";
import { backendApi } from "../../backendApi";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete backendApi.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    if (token) {
      backendApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);

      } catch (error) {
        console.error("Token decoding error:", error);
        logout();

      }
    } else {
      delete backendApi.defaults.headers.common["Authorization"];
      setUser(null);

    }
  }, [token]);

  useEffect(() => {
    const resInterceptor = backendApi.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.warn("Token lejárt vagy érvénytelen, automatikus logout");
          logout();

        }

        return Promise.reject(error);
      }
    );

    setLoading( loading => loading | 2 );

    return () => backendApi.interceptors.response.eject(resInterceptor);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>

  );
};

export const useAuth = () => useContext(AuthContext);
