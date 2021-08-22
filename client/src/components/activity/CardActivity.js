import React from "react";
import styles from "../../css/activity/activityWrapper.module.css";

const cardActivity = ({ activity }) => {
  return (
    <>
      {activity.action == "edit" ? (
        <>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Card number : {activity.oldCNo}</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p className={styles.changeText}>Changed to :</p> <p>{activity.newCNo}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Bank : {activity.oldBank}</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p className={styles.changeText}>Changed to :</p> <p>{activity.newBank}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>cvv : {activity.oldCvv}</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p className={styles.changeText}>Changed to :</p> <p>{activity.newCvv}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Expiry : {activity.oldExpiry}</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p className={styles.changeText}>Changed to :</p> <p>{activity.newExpiry}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>User : {activity.oldUser}</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p className={styles.changeText}>Changed to :</p> <p>{activity.newUser}</p>
            </div>
          </div>
        </>
      ) : activity.action == "add" ? (
        <>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Card number :</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p>{activity.CNo}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Bank :</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p>{activity.bank}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>cvv :</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p>{activity.cvv}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>Expiry :</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p>{activity.expiry}</p>
            </div>
          </div>
          <div className={styles.activityItemWrapper}>
            <div className={styles.oldValueWrapper}>
              <p>User :</p>
            </div>
            <div className={styles.newValueWrapper}>
              <p>{activity.user}</p>
            </div>
          </div>
        </>
      ) : (
        activity.action == "delete" && (
          <>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>Card number :</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p>{activity.CNo}</p>
              </div>
            </div>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>Bank</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p>{activity.bank}</p>
              </div>
            </div>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>cvv :</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p>{activity.cvv}</p>
              </div>
            </div>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>Expiry :</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p>{activity.expiry}</p>
              </div>
            </div>
            <div className={styles.activityItemWrapper}>
              <div className={styles.oldValueWrapper}>
                <p>User :</p>
              </div>
              <div className={styles.newValueWrapper}>
                <p>{activity.user}</p>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default cardActivity;
