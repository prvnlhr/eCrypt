import React from "react";
import styles from "../../css/activity/activityWrapper.module.css";

const LoginIdActivity = ({ activity }) => {
  return (
    <>
      {activity.action === "edit" ? (
        <>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Website : {activity.oldWebsite}</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p className={styles.changeText}>Changed to :</p>
              <p>{activity.newWebsite}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Username : {activity.oldUsername}</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p className={styles.changeText}>Changed to :</p>
              <p>{activity.newUsername}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Password : {activity.oldPassword}</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p className={styles.changeText}>Changed to :</p>
              <p>{activity.newPassword}</p>
            </div>
          </div>
        </>
      ) : activity.action === "add" ? (
        <>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Website :</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p>{activity.website}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Username :</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p>{activity.username}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Password :</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p>{activity.password}</p>
            </div>
          </div>
        </>
      ) : (
        activity.action === "delete" && (
          <>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>Website :</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p>{activity.website}</p>
              </div>
            </div>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>Username :</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p>{activity.username}</p>
              </div>
            </div>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>Password :</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p>{activity.password}</p>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default LoginIdActivity;
