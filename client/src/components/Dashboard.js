import React from "react";
import { useEffect } from "react";
import { useSelector} from "react-redux";

import styles from "../css/dashboard.module.css";

import RecentActivityList from "./RecentActivityList";

const Dashboard = ({ setHeading, activities }) => {

  const loginIdsArray = useSelector((state) => state.logins.loginIds);
  const cardsArray = useSelector((state) => state.cards.cards);
  const docsArray = useSelector((state) => state.docs.docs);


  useEffect(() => {
    setHeading("Dashboard");
  }, []);

  return (
    <div className={styles.dashboardComponent}>
      <div className={styles.countContainer}>
        <div className={styles.countDiv}>
          <div className={styles.count}>{cardsArray.length}</div>
          <div className={styles.footer}>Total Cards</div>
        </div>
        <div className={styles.countDiv}>
          <div className={styles.count}>{loginIdsArray.length}</div>
          <div className={styles.footer}>Total Logins</div>
        </div>
        <div className={styles.countDiv}>
          <div className={styles.count}>{docsArray.length}</div>
          <div className={styles.footer}>Total Docs</div>
        </div>
      </div>
      <div className={styles.recentActivityListHeadingDiv}>
        <p>Recent Activities</p>
      </div>
      <RecentActivityList activities={activities} />
    </div>
  );
};
export default Dashboard;
