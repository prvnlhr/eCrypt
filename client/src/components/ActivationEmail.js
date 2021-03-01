import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import formStyles from "../css/forgotPass.module.css";
import {  Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { activationEmail } from "../actions/auth";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const ActivationEmail = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const { activation_token } = useParams();

  useEffect(() => {

    if (activation_token) {
      dispatch(activationEmail(activation_token));
    }
  }, []);

  return (
    <div className={formStyles.forgotPassPage}>
      <div className={formStyles.appNameDiv}>
        <p>
          <span>e</span>Crypt
        </p>
      </div>
      <br />

      <div className={formStyles.containerForm}>
        <Typography
          component="h1"
          variant="h5"
          className={formStyles.typography}
        >
          {notification.success
            ? "Account Successfully Activated. Login to continue"
            : "Link Expired ! Please register again"}
        </Typography>
        <br />

        <div className={formStyles.formContainer}>
          {notification.error || notification.success ? (
            <div
              className={
                notification.error
                  ? formStyles.notificationErrorDiv
                  : formStyles.notificationSuccessDiv
              }
            >
              {notification.error ? (
                <p>{notification.error}</p>
              ) : (
                <p>{notification.success}</p>
              )}
            </div>
          ) : null}
          <br />

          <Grid item>
            <Grid item>
              {notification.error ? (
                <Link to="/register" className={formStyles.linkText}>
                  Register again
                </Link>
              ) : (
                <Link to="/login" className={formStyles.linkText}>
                  Login
                </Link>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ActivationEmail;
