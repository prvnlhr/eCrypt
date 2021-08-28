import React from "react";
import styles from "../../css/Skeletons/loginIdSkeleton.module.css";
import Shimmer from "./Shimmer";

const LoginIdSkeleton = () => {
  return (
    <div className={styles.loginIdContainer}>
      <div className={styles.userNameWrapper}>
        <Shimmer />
      </div>
      <div className={styles.websiteWrapper}>
        <Shimmer />
      </div>
      <div className={styles.passwordWrapper}>
        <Shimmer />
      </div>

      <div className={styles.logoWrapper}>
        <div className={styles.logoDiv}>
          <Shimmer />
        </div>
      </div>
    </div>
  );
};

export default LoginIdSkeleton;
