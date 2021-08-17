import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../actions/userAction";

import {
  Switch,
  Route,
  useHistory,
  Redirect,
  useParams,
} from "react-router-dom";

import Home from "./Home";
import styles from "../css/app.module.css";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import { getToken } from "../actions/auth";
import ActivateAccount from "./ActivateAccount";
import NotFound from "./NotFound";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token.token);
  const history = useHistory();
  const { isLogged } = auth;
  const { activation_token } = useParams();

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
