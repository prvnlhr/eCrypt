import React from "react";
import styles from "../../css/Skeletons/docSkeleton.module.css";
import Shimmer from "./Shimmer";

const DocSkeleton = () => {
  return (
    <div className={styles.documentCard}>
      <div className={styles.imageContainer}>
        
        <div className={styles.img}>
          <Shimmer />
        </div>
        <Shimmer />
        <div className={styles.favBtnDiv}>
          {/* <Shimmer /> */}
        </div>
      </div>

      <div className={styles.titleDiv}>
        <Shimmer />
      </div>
    </div>
  );
};

export default DocSkeleton;
