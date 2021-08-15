import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, Redirect } from "react-router-dom";
import { login } from "../actions/auth";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { HiArrowNarrowRight } from "react-icons/hi";
import formStyles from "../css/signInPage.module.css";
import styles from "../css/signInPageNew.module.css";
import { CircleSpinner } from "react-spinners-kit";
import { getToken } from "../actions/auth";

const initialState = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const auth = useSelector((state) => state.auth);
  const loadState = useSelector((state) => state.loading);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  // const isLoading = useSelector((state) => state.loading.isLoading);
  const notification = useSelector((state) => state.notification);
  const message = useSelector((state) => state.authResponseHandler);

  // const { isLogged } = auth;
  const { place, isLoading } = loadState;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // useEffect(() => {
  //   console.log(place, isLoading);
  // }, [place, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData);
      await dispatch(login(formData, history));
    } catch (error) {
      console.log(error);
    }
  };
  const { email, password } = formData;

  return (
    <div className={styles.formComponent}>
      <form className={styles.formTag} onSubmit={handleSubmit}>
        <div className={styles.headingWrapper}>
          <p className={styles.HeadingText}>Sign In</p>
        </div>
        <div className={styles.messageWrapper}>
          {message.error && message.at === "login" ? (
            <div className={styles.errorDiv}>
              <p>{message.error}</p>
            </div>
          ) : (
            message.success &&
            message.at === "login" && (
              <div className={styles.successDiv}>
                <p>{message.success}</p>
              </div>
            )
          )}
        </div>

        <div className={styles.emailWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>EMAIL ADDRESS</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              required
              placeholder="email address"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.passwordWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>PASSWORD</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              required
              placeholder="password"
              name="password"
              value={password}
              onChange={handleChange}
              type="password"
            />
          </div>
        </div>
        <div className={styles.forgotPasswordWrapper}>
          <Link to="/user/auth/forgotPassword" className={styles.link}>
            forgot password
          </Link>
        </div>

        <div className={styles.buttonWrapper}>
          <button type="submit">
            {place === "login" && isLoading === true ? (
              <CircleSpinner size={10} color="white" loading={true} />
            ) : (
              <p>Sign In</p>
            )}
          </button>
        </div>
        <div className={styles.BottomLinkWrapper}>
          <p>
            Don't have an account?
            <Link to="/register" className={styles.link}>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default SignInPage;
