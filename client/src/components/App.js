import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../actions/userAction";
import jwt_decode from "jwt-decode";

import React from "react";

import { Switch, Route, Redirect, useLocation } from "react-router-dom";

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

  const [logoutDivShow, setLogoutDivShow] = useState(false);




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
      // console.log(expiry < currentTime);
      if (expiry < currentTime) {
        dispatch(getToken(null));
      }
    }
  }, [location]);
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    // console.log("custom height",vh)
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  return (
    <div className={styles.app}  >
      <div className={styles.appBgDiv1}>

<div className={styles.section1}></div>
<div className={styles.section2}></div>
<div className={styles.section3}></div>



      </div>

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
