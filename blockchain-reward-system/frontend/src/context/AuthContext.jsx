import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ✅ Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Check if user is logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Login Function
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user
      setUser(response.data.user);
      return response.data.user; // Return user for redirection
    } catch (error) {
      throw new Error("Invalid Credentials");
    }
  };

  // ✅ Logout Function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

// ✅ Custom Hook for Authentication
export const useAuth = () => useContext(AuthContext);
