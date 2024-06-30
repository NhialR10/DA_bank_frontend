import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserLogin(token);
    }
  }, []);
  const login = (token) => {
    localStorage.setItem("token", token);
    setUserLogin(token);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUserLogin(null);
  };
  return (
    <AuthContext.Provider value={{ userLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
