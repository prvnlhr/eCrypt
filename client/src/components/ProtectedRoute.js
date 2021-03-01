import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector} from "react-redux";
const ProtectedRoute = ({ component }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  const Component = component;
  return isAuthenticated ? (
    <Component />
  ) : (
    <Redirect exact to={{ pathname: "/login" }} />
  );
};

export default ProtectedRoute;
