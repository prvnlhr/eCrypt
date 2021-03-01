import React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory, Link } from "react-router-dom";
import { forgotPassword } from "../actions/auth";

// import { GoogleLogin } from "react-google-login";
// import { register } from "../actions/newAuth";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import formStyles from "../css/forgotPass.module.css";
import { HiArrowNarrowRight } from "react-icons/hi";

import { CircleSpinner } from "react-spinners-kit";

const initialState = {
  email: "",
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);
  const notification = useSelector((state) => state.notification);
  const isLoading = useSelector((state) => state.loading.isLoading);

  const { email } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   
  };
  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
  };

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
          Verify your email to get reset link
        </Typography>
        <br />

        <div className={formStyles.formContainer} onSubmit={handleSubmit}>
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

          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
            size="small"
          />

          <button
            onClick={handleForgotPassword}
            className={formStyles.submitBtn}
          >
            {isLoading ? (
              <CircleSpinner size={15} color="white" loading={true} />
            ) : (
              <HiArrowNarrowRight fontSize="20px" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

