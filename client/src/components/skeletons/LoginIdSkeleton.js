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
{
  /* { isLoading === true &&
        place === "loginIdList" &&
        loginIds.length < 1 ? (
          <>
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
          </>
        ) : (
          isLoading === false &&
          loginIds.length < 1 ? (
            <div className={noContentStyles.messageContainer}>
              <p>No Logins Added</p>

              <div className={noContentStyles.footerDIv}>
                Click
                <FiPlusCircle
                  className={noContentStyles.icon}
                  fontSize="19px"
                />
                to add
              </div>
            </div>
          )
        ) :  loginIds.length >= 1 &&(

          <div></div>
        )
        
        } */
}
