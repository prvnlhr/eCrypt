import React from "react";
import styles from "../css/dashboard.module.css";
import RecentItem from "./RecentItem";

const RecentActivityList = ({ activities }) => {
  return (
    <div className={styles.recentActivityList}>
      {activities.map((activity) => (
        <>
          <RecentItem activity={activity} />
        </>
      ))}
    </div>
  );
};

export default RecentActivityList;
