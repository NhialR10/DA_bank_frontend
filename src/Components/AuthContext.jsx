import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserLogin(JSON.parse(storedUser)); // Parse JSON string to object
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);

  const login = (user) => {
    try {
      localStorage.setItem("user", JSON.stringify(user)); // Convert object to JSON string
      setUserLogin(user);
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserLogin(null);
  };

  return (
    <AuthContext.Provider value={{ userLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
