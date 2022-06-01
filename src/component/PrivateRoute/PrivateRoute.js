import React from "react";
import { useSelector } from "react-redux";

import Loadingg from "../Loadingg/Loadingg";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer.currentUser);
  const authing = useSelector((state) => state.userReducer.authing);
  return authing ? <Loadingg /> : user ? children : <h1></h1>;
};

export default PrivateRoute;
