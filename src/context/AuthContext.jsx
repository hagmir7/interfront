"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, logout as apiLogout } from "@/services/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Load current user on app mount
  useEffect(() => {
    User().then((u) => {
      setUser(u);
      setAuthLoading(false);
    });
  }, []);

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);