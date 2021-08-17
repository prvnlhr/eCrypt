import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import styles from "../css/activateAccountComponent.module.css";
import { useParams, Link } from "react-router-dom";
import { activationEmail } from "../actions/auth";
import { CircleSpinner } from "react-spinners-kit";
import { Icon } from "@iconify/react";


const ActivateAccount = () => {
  const dispatch = useDispatch();
  const { activation_token } = useParams();
  const loadState = useSelector((state) => state.loading);
  const message = useSelector((state) => state.authResponseHandler);
  const { place, isLoading } = loadState;
  const handleAccountActivate = () => {
    dispatch(activationEmail(activation_token));
  };
  // useEffect(() => {
  //   console.log(activation_token);
  // }, [activation_token]);

  return (
    <div className={styles.activateComponent}>
      <div className={styles.activateContainer}>
        <div className={styles.headingWrapper}>
          <p className={styles.HeadingText}>Click button to activate account</p>
        </div>
        <div className={styles.messageWrapper}>
          {message.error && message.at === "activateAccount" ? (
            <div className={styles.errorDiv}>
              <Icon icon="carbon:warning" className={styles.icon} />

              <p>{message.error}</p>
            </div>
          ) : (
            message.success &&
            message.at === "activateAccount" && (
              <div className={styles.successDiv}>
                <Icon  icon="akar-icons:circle-check" className={styles.icon}/>

                <p>{message.success}</p>
              </div>
            )
          )}
        </div>

        <div className={styles.buttonWrapper}>
          <button onClick={handleAccountActivate}>
            {place === "activateAccount" && isLoading === true ? (
              <CircleSpinner size={15} color="white" loading={true} />
            ) : (
              <p>Activate account</p>
            )}
          </button>
        </div>
        <div className={styles.BottomLinkWrapper}>
          {message.success && message.at === "activateAccount" ? (
            <p>
              <Link to="/login"> Login </Link>
            </p>
          ) : message.error && message.at === "activateAccount" ? (
            <p>
              Sign Up agin ?
              <Link to="/register" className={styles.link}>
                Sign Up
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;
