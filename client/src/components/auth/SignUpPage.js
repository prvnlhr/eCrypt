import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../actions/auth";

import styles from "../../css/auth/signUpPageNew.module.css";
import { HiArrowNarrowRight } from "react-icons/hi";
import { CircleSpinner } from "react-spinners-kit";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

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
    <div className={styles.formPage}>
      <div className={styles.leftSection}>
       
        {/* <div className={styles.appAboutWrapper}>
          <div className={styles.lineOneDiv}>
            <p>A Digital solution for all your important data</p>
          </div>
          <div className={styles.lineTwoDiv}>
            <p>
              Access your Bank cards details, Logins passwords and Documents on
              the go
            </p>
          </div>
          <div className={styles.lineThreeDiv}>
            <p>Simple</p>
            <p className={styles.dot}>.</p>
            <p>Secure</p>
          </div>
        </div> */}
      </div>
      <div className={styles.rightSection}>
      <div className={styles.appLogoWrapper}>
          <div className={styles.logoDiv}>
            <p className={styles.textOne}>e</p>
            <p className={styles.textTwo}>Crypt</p>
          </div>
        </div>
        <div className={styles.formComponent}>
          <form className={styles.formTag} onSubmit={handleSubmit}>
            <div className={styles.headingWrapper}>
              <p className={styles.HeadingText}>Sign Up</p>
            </div>
            <div className={styles.messageWrapper}>
              {message.error && message.at === "register" ? (
                <div className={styles.errorDiv}>
                  <Icon icon="carbon:warning" className={styles.icon} />

                  <p>{message.error}</p>
                </div>
              ) : (
                message.success &&
                message.at === "register" && (
                  <div className={styles.successDiv}>
                    <Icon
                      icon="akar-icons:circle-check"
                      className={styles.icon}
                    />
                    <p>{message.success}</p>
                  </div>
                )
              )}
            </div>
            <div className={styles.firstNameWrapper}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>First name</p>
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
                <p className={styles.labelText}>Last name</p>
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
                />
              </div>
            </div>
            <div className={styles.password1Wrapper}>
              <div className={styles.labelDiv}>
                <p className={styles.labelText}>Password</p>
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
                <p className={styles.labelText}>Confirm Password</p>
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
              <motion.button whileTap={{ scale: 0.95 }} type="submit">
                {place === "signUp" && isLoading === true ? (
                  <CircleSpinner size={15} color="white" loading={true} />
                ) : (
                  <p>Sign In</p>
                )}
              </motion.button>
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
      </div>
    </div>
  );
};
export default SignUpPage;
