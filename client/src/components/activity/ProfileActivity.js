import React from "react";
import styles from "../../css/activity/activityWrapper.module.css";

const ProfileActivity = ({ activity }) => {
  return (
    <>
      {activity.action === "passwordChange" ? (
        <>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Old password : {activity.oldPassword}</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p className={styles.changeText}>Changed to :</p>
              <p> {activity.newPassword}</p>
            </div>
          </div>
        </>
      ) : (
        activity.action === "profileUpdate" && (
          <>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>Email : {activity.oldEmail}</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p className={styles.changeText}>Changed to :</p>
                <p> {activity.newEmail}</p>
              </div>
            </div>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>First name : {activity.oldFirstName}</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p className={styles.changeText}>Changed to :</p>
                <p> {activity.newFirstName}</p>
              </div>
            </div>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>Last name : {activity.oldLastName}</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p className={styles.changeText}>Changed to :</p>{" "}
                <p> {activity.newLastName}</p>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default ProfileActivity;
