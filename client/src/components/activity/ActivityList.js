import React from "react";
import ActivityComponent from "./ActivityComponent";
import styles from "../../css/activity/activityList.module.css";
const ActivityList = ({ activities }) => {
  // console.log(activities.activities);
  return (
    <div className={styles.activityList}>
      {activities.activities.map((activity) => (
        <ActivityComponent activity={activity} />
      ))}
    </div>
  );
};

export default ActivityList;
