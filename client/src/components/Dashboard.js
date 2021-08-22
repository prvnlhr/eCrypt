import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "../css/dashboard.module.css";

import RecentActivityList from "./RecentActivityList";
import ActivityList from "./activity/ActivityList";

const Dashboard = ({ setHeading, activities }) => {
  const loginIdsArray = useSelector((state) => state.logins.loginIds);
  const cardsArray = useSelector((state) => state.cards.cards);
  const docsArray = useSelector((state) => state.docs.docs);
  const activitiesArray = useSelector((state) => state.activities);

  useEffect(() => {
    setHeading("Dashboard");
  }, []);

  return (
    <div className={styles.dashboardComponent}>
      <div className={styles.countWrapper}>
        <div className={styles.countContainer}>
          <div className={styles.countDiv}>
            <p>{cardsArray.length}</p>
          </div>
          <div className={styles.footer}>
            <div className={styles.underLineDiv1}></div>
            <p>Cards</p>
          </div>
        </div>
        <div className={styles.countContainer}>
          <div className={styles.countDiv}>
            <p>{loginIdsArray.length}</p>
          </div>
          <div className={styles.footer}>
            <div className={styles.underLineDiv2}></div>
            <p>Logins</p>
          </div>
        </div>
        <div className={styles.countContainer}>
          <div className={styles.countDiv}>
            <p>{docsArray.length}</p>
          </div>
          <div className={styles.footer}>
            <div className={styles.underLineDiv3}></div>
            <p>Docs</p>
          </div>
        </div>
      </div>
      <div className={styles.recentActivityListHeadingDiv}>
        <p>Recent Activities</p>
      </div>
      {/* <RecentActivityList activities={activities} /> */}
      <ActivityList activities={activitiesArray} />
    </div>
  );
};
export default Dashboard;
