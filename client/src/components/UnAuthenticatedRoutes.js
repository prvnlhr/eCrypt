import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route ,useParams} from "react-router-dom";

const UnAuthenticatedRoutes = ({ component }) => {
  const auth = useSelector((state) => state.auth);
  const { activation_token } = useParams();
console.log(activation_token)
  const { isLogged } = auth;
  const Component = component;

  return (
    <Route
      render={(props) =>
        isLogged === false ? (
          <Component />
        ) : (
          isLogged === true && <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

export default UnAuthenticatedRoutes;
