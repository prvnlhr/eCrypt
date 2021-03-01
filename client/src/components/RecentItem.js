import React from "react";
import styles from "../css/dashboard.module.css";
import { IoCard } from "react-icons/io5";
import { IoMdKey, IoMdDocument } from "react-icons/io";
import { RiSettings3Fill } from "react-icons/ri";

const RecentItem = (activity) => {
  const dateString = activity.activity.date.split(/[" "]+/);
  const month = dateString[0].slice(0, 3);
  const day = dateString[1];
  const time = dateString[3];
  return (
    <div className={styles.recentItemContainer}>
      <div className={styles.logo}>
        <div>
          {activity.activity.type === "Card" ? (
            <IoCard fontSize="24px" color="slategray" />
          ) : activity.activity.type === "Login" ? (
            <IoMdKey fontSize="24px" color="slategray" />
          ) : activity.activity.type === "Doc" ? (
            <IoMdDocument fontSize="24px" color="slategray" />
          ) : activity.activity.type === "Settings" ? (
            <RiSettings3Fill fontSize="24px" color="slategray" />
          ) : null}
        </div>
      </div>
      <div className={styles.task}>
        <div>
          <p
            className={
              activity.activity.task === "Added"
                ? styles.taskAdded
                : activity.activity.task === "Edited"
                ? styles.taskEdited
                : activity.activity.task === "Deleted"
                ? styles.taskDeleted
                : null
            }
          >
            {activity.activity.task}
          </p>
        </div>
      </div>
      <div className={styles.type}>
        <div>
          <p>{activity.activity.type}</p>
        </div>
      </div>
      <div className={styles.date}>
        <p>
          {month} {day} {time}
        </p>
      </div>
      <div className={styles.name}>
        <p> {activity.activity.name}</p>
      </div>
      <div className={styles.item}>
        <p>{activity.activity.item}</p>
      </div>
    </div>
  );
};

export default RecentItem;
