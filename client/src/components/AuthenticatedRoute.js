import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthenticatedRoute = ({ component }) => {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  console.log(isLogged);
  const Component = component;
  return isLogged === true ? (
    <Component />
  ) : (
    isLogged === false && <Redirect to={{ pathname: "/login" }} />
  );
};

export default AuthenticatedRoute;
