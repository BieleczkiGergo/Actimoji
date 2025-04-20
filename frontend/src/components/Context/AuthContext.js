import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const localDomain = "localhost:8080";
//const ddnsDomain = "actimoji.duckdns.org:8080";

const backendDomain = localDomain;

const backendUrlHttp = `http://${backendDomain}`;
const backendUrlWs = `ws://${backendDomain}`;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendApi = axios.create({
    baseURL: backendUrlHttp
    
  });

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

      setLoading( false );
    }
  }, [ token ]);

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

    return () => backendApi.interceptors.response.eject(resInterceptor);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, backendApi, loading }}>
      {children}
    </AuthContext.Provider>

  );
};

export { 
  AuthContext, backendUrlHttp, backendUrlWs, backendDomain

};
