import React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../actions/auth";

// import { GoogleLogin } from "react-google-login";
// import { register } from "../actions/newAuth";

import styles from "../../css/auth/forgotPass.module.css";
import { CircleSpinner } from "react-spinners-kit";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const initialState = {
  email: "",
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);
  // const isLoading = useSelector((state) => state.loading.isLoading);
  const message = useSelector((state) => state.authResponseHandler);

  const loadState = useSelector((state) => state.loading);
  const { place, isLoading } = loadState;
  const { email } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className={styles.formComponent}>
      <form className={styles.formTag} onSubmit={handleForgotPassword}>
        <div className={styles.headingWrapper}>
          <p className={styles.HeadingText}>
            Verify your email to get reset link
          </p>
        </div>
        <div className={styles.messageWrapper}>
          {message.error && message.at === "forgotPassword" ? (
            <div className={styles.errorDiv}>
              <Icon icon="carbon:warning" className={styles.icon} />

              <p>{message.error}</p>
            </div>
          ) : (
            message.success &&
            message.at === "forgotPassword" && (
              <div className={styles.successDiv}>
                <Icon icon="akar-icons:circle-check" className={styles.icon} />

                <p>{message.success}</p>
              </div>
            )
          )}
        </div>

        <div className={styles.emailWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>Email Address</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              required
              placeholder="email address"
              name="email"
              value={email}
              onChange={handleChange}
              type="text"
            />
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <motion.button whileTap={{ scale: 0.95 }} type="submit">
            {place === "forgotPassword" && isLoading === true ? (
              <CircleSpinner size={15} color="white" loading={true} />
            ) : (
              <p>Send email</p>
            )}
          </motion.button>
        </div>
        <div className={styles.BottomLinkWrapper}>
          <p>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
