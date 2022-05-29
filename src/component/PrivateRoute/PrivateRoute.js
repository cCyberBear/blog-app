import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer.user);
  const authing = useSelector((state) => state.userReducer.authing);
  return authing ? (
    <h1>Loading....</h1>
  ) : user ? (
    children
  ) : (
    <Navigate to="/my-account" />
  );
};

export default PrivateRoute;
