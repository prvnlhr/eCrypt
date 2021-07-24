import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/auth";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import formStyles from "../css/signUpPage.module.css";
import { HiArrowNarrowRight } from "react-icons/hi";
import { CircleSpinner } from "react-spinners-kit";

import secure from "../img/secure.svg";
import secure1 from "../img/secure1.svg";
import docs from "../img/docs.svg";
import cards from "../img/cards.svg";
import login from "../img/login.svg";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpPage = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   window.scroll({
  //     bottom: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // }, []);

  const handleClick = () => {
    window.scroll({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
    console.log("clicked");
  };

  const [formData, setFormData] = useState(initialState);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const notification = useSelector((state) => state.notification);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };
  const { firstName, lastName, email, password, confirmPassword } = formData;

  return (
    <div className={formStyles.signUpPage}>
      <div className={formStyles.containerBio}>
      <img className={formStyles.docImg} src={docs} />
      <img className={formStyles.cardImg} src={cards} />
      <img className={formStyles.loginImg} src={login} />

        <div className={formStyles.appNameDiv}>
          <span className={formStyles.appNameDivSpan}>e</span>
          <p className={formStyles.appNameDivP}>Crypt</p>
        </div>
        <div className={formStyles.bioDiv}>
          <img className={formStyles.secureImg} src={secure} />
          <p className={formStyles.heading1}>
            A Digital Solution for all your important data.
          </p>
          <p className={formStyles.heading2}>
            Access your Bank cards details, Logins passwords and Documents on
            the go
          </p>
          <br />
          <p onClick={handleClick} className={formStyles.dotText}>
            Simple<span className={formStyles.dot}>.</span>Secure
          </p>
        </div>
      </div>

      <div className={formStyles.containerForm}>
        <div className={formStyles.signUpTextDIv} component="h1" variant="h4">
          Sign Up
        </div>

        <form className={formStyles.form} onSubmit={handleSubmit}>
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
          {/* <br /> */}

          <Grid container spacing={2} className={formStyles.grid}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                size="small"
                value={firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                size="small"
                value={lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                size="small"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                size="small"
                value={password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                size="small"
                value={confirmPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <br />
          <button type="submit" className={formStyles.submitBtn}>
            {isLoading ? (
              <CircleSpinner size={15} color="white" loading={true} />
            ) : (
              <HiArrowNarrowRight fontSize="20px" />
            )}
          </button>
          <div className={formStyles.AlreadyHaveAccountDiv}>
            <Link to="/login" className={formStyles.linkText}>
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUpPage;
