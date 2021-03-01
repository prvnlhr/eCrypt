import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../actions/userAction";
import jwt_decode from "jwt-decode";

import React from "react";

import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";

import Home from "./Home";
import styles from "../css/app.module.css";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import ActivationEmail from "./ActivationEmail";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import { getToken } from "../actions/auth";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getToken(null));
    }
  }, [auth.isLogged, dispatch, isAuthenticated, token]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!token) {
      <Redirect to="/login" />;
    }
  }, [isAuthenticated, dispatch, token]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const expiry = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();
      console.log(expiry < currentTime);
      if (expiry < currentTime) {
        dispatch(getToken(null));
      }
    }
  }, [location]);

  return (
    <div className={styles.app}>

      <Switch>
        <Route exact path="/user/reset/:token" component={ResetPassword} />
        
        <Route exact path="/login" component={SignInPage} />
        <Route exact path="/register" component={SignUpPage} />
        <Route
          exact
          path="/user/activate/:activation_token"
          component={ActivationEmail}
        />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <ProtectedRoute path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
