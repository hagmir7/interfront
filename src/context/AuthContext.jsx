"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User as getUser,
  logout as apiLogout,
} from "@/services/auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    loadUser();
  }, []);


  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      setUser(null);
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={'390112782986-ojtfc9lpi69tvgd2chc9smq8ppojhthj.apps.googleusercontent.com'}
    >
      <AuthContext.Provider
        value={{
          user,
          setUser,
          logout,
          authLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};