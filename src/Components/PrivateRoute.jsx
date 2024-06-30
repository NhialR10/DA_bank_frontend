import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function PrivateRoute({ element: Component, ...rest }) {
  const { userLogin } = useContext(AuthContext);
  return userLogin ? <Component {...rest} /> : <Navigate to="/login" />;
}

export default PrivateRoute;
