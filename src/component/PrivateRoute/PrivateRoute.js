import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer.currentUser);
  const authing = useSelector((state) => state.userReducer.authing);
  return authing ? <h1>Loadding...</h1> : user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
