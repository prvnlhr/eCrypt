import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { login } from "../actions/auth";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { HiArrowNarrowRight } from "react-icons/hi";
import formStyles from "../css/signInPage.module.css";
import { CircleSpinner } from "react-spinners-kit";
const initialState = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const notification = useSelector((state) => state.notification);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(formData));
    history.push("/");
  };
  const { email, password } = formData;

  return (
    <div className={formStyles.signInPage}>
      <div className={formStyles.appNameDiv}>
        <p>
          <span>e</span>Crypt
        </p>
      </div>
      <br />

      <div className={formStyles.containerForm}>
        <Typography component="h1" variant="h6">
          Sign In
        </Typography>

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

          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            size="small"
            value={password}
            onChange={handleChange}
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/forgotPassword" className={formStyles.linkText}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <button type="submit" className={formStyles.submitBtn}>
            {isLoading ? (
              <CircleSpinner size={15} color="white" loading={true} />
            ) : (
              <HiArrowNarrowRight fontSize="20px" />
            )}
          </button>
        </form>

        <br />

        <Grid item>
          <Grid item>
            <Link to="/register" className={formStyles.linkText}>
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default SignInPage;
