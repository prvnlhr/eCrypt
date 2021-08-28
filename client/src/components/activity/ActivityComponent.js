import React from "react";
import CardActivity from "./CardActivity";
import LoginIdActivity from "./LoginIdActivity";
import DocActivity from "./DocActivity";
import ProfileActivity from "./ProfileActivity";
import styles from "../../css/activity/activityWrapper.module.css";
const ActivityComponent = ({ activity }) => {
  return (
    <div className={styles.activityWrapper}>
      <div className={styles.leftPortion}>
        <div className={styles.dateContainer}>
          <p className={styles.monthText}>{activity.month}</p>
          <p className={styles.dateText}>{activity.date}</p>
        </div>
      </div>
      <div className={styles.rightPortion}>
        {/* ____Here lies different Activity items for card,doc,loginIds,profile_____ */}
        <div className={styles.topWrapper}>
          <div className={styles.timeWrapper}>
            <div className={styles.timeDiv}>
              <p>{activity.time}</p>
            </div>
          </div>
          <div className={styles.activityTypeWrapper}>
            <div
              className={`${styles.categoryDiv} ${
                activity.type === "card"
                  ? styles.catCard
                  : activity.type === "doc"
                  ? styles.catDoc
                  : activity.type === "loginId"
                  ? styles.catLoginId
                  : activity.type === "settings" && styles.catSettings
              } `}
            >
              <p>{activity.type}</p>
            </div>
            <div className={styles.actionDiv}>
              <p>{activity.action}</p>
            </div>
          </div>
        </div>
        <div className={styles.bottomWrapper}>
          {activity.type === "card" ? (
            <CardActivity activity={activity} />
          ) : activity.type === "loginId" ? (
            <LoginIdActivity activity={activity} />
          ) : activity.type === "doc" ? (
            <DocActivity activity={activity} />
          ) : (
            activity.type === "settings" && (
              <ProfileActivity activity={activity} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityComponent;
