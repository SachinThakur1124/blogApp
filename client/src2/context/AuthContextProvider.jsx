// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/v1/auth/verifyToken", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      if (response.data.success) {
        setAuthState({
          isAuthenticated: true,
          user: response.data.user,
          loading: false,
        });
      } else {
        setAuthState({ isAuthenticated: false, user: null, loading: false });
      }
    } catch (error) {
      console.error("Authentication check failed", error);
      setAuthState({ isAuthenticated: false, user: null, loading: false });
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      checkAuth();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ isAuthenticated: false, user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContext;
