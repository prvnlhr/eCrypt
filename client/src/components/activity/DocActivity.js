import React from "react";
import styles from "../../css/activity/activityWrapper.module.css";

const DocActivity = ({ activity }) => {
  return (
    <>
      {activity.action === "edit" ? (
        <>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Title : {activity.oldTitle}</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p className={styles.changeText}>Changed to :</p>
              <p> {activity.newTitle}</p>
            </div>
          </div>
        </>
      ) : activity.action === "add" ? (
        <>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Title :</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p>{activity.title}</p>
            </div>
          </div>
        </>
      ) : (
        activity.action === "delete" && (
          <>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>Title :</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p>{activity.title}</p>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default DocActivity;
