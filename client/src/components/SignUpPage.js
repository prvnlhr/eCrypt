import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/auth";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import formStyles from "../css/signUpPage.module.css";
import styles from "../css/signUpPageNew.module.css";
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

  const [formData, setFormData] = useState(initialState);
  // const isLoading = useSelector((state) => state.loading.isLoading);
  const loadState = useSelector((state) => state.loading);

  const notification = useSelector((state) => state.notification);
  const message = useSelector((state) => state.authResponseHandler);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(register(formData));
  };
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const { place, isLoading } = loadState;

  return (
    <div className={styles.formComponent}>
      <form className={styles.formTag} onSubmit={handleSubmit}>
        <div className={styles.headingWrapper}>
          <p className={styles.HeadingText}>Sign Up</p>
        </div>
        <div className={styles.messageWrapper}>
          {message.error && message.at === "register" ? (
            <div className={styles.errorDiv}>
              <p>{message.error}</p>
            </div>
          ) : (
            message.success &&
            message.at === "register" && (
              <div className={styles.successDiv}>
                <p>{message.success}</p>
              </div>
            )
          )}
        </div>
        <div className={styles.firstNameWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>FIRST NAME</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              required
              placeholder="first name"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.lastNameWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>LAST NAME</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              required
              placeholder="last name"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
          </div>
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
        <div className={styles.password1Wrapper}>
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
        <div className={styles.password2Wrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>CONFIRM PASSWORD</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              required
              placeholder="confirm password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              type="password"
            />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button type="submit">
            {place === "register" && isLoading === true ? (
              <CircleSpinner size={15} color="white" loading={true} />
            ) : (
              <p>Sign In</p>
            )}
          </button>
        </div>
        <div className={styles.BottomLinkWrapper}>
          <p to="/login">
            Already have an account?{" "}
            <Link to="/login" className={styles.link}>
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default SignUpPage;
