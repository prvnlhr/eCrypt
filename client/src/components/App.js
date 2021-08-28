import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Switch, Route, useHistory, useParams } from "react-router-dom";

import Home from "./app_layout/Home";
import AuthenticatedRoute from "./app_layout/AuthenticatedRoute";
import UnAuthenticatedRoutes from "./app_layout/UnAuthenticatedRoutes";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import SignUpPage from "./auth/SignUpPage";
import SignInPage from "./auth/SignInPage";
import NotFound from "./app_layout/NotFound";
import ActivateAccount from "./auth/ActivateAccount";
import styles from "../css/app_layout/app.module.css";
import { fetchUser } from "../actions/userAction";
import { getToken } from "../actions/auth";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token.token);
  const history = useHistory();
  const { isLogged } = auth;

  const getAuthToken = async () => {
    await dispatch(getToken(history));
  };
  // useEffect(() => {
  //   if (isLogged === true) {
  //     getAuthToken();
  //   }
  // }, [isLogged]);

  useEffect(() => {
    getAuthToken();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [token]);

  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document

  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  return (
    <div className={styles.app}>
      <div className={styles.appBgDiv1}>
        <div className={styles.section1}></div>
        <div className={styles.section2}></div>
        <div className={styles.section3}></div>
      </div>
      <Switch>
        <Route
          path="/user/auth/reset/:reset_token"
          component={
            isLogged === true
              ? NotFound
              : isLogged === false
              ? ResetPassword
              : null
          }
          exact
        />

        <UnAuthenticatedRoutes exact path="/login" component={SignInPage} />
        <UnAuthenticatedRoutes exact path="/register" component={SignUpPage} />
        <UnAuthenticatedRoutes
          exact
          path="/user/auth/forgotPassword"
          component={ForgotPassword}
          exact
        />

        <Route
          path="/user/auth/activate/:activation_token"
          component={
            isLogged === true
              ? NotFound
              : isLogged === false
              ? ActivateAccount
              : null
          }
          exact
        />

        <AuthenticatedRoute path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
