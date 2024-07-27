import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get("user");
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
      setUserLogin(user);
      Cookies.set("user", user);
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const logout = () => {
    Cookies.remove("user");
    setUserLogin(null);
  };

  return (
    <AuthContext.Provider value={{ userLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
