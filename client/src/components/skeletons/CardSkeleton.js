import React from "react";
import styles from "../../css/Skeletons/cardSkeleton.module.css";
import Shimmer from "./Shimmer";

const CardSkeleton = () => {
  return (
    <div className={styles.cardContainer}>

      <div className={styles.cardLogo}>
        <Shimmer />
      </div>
      {/* <div className={styles.buttonDiv}>
        <Shimmer />
      </div> */}
      <div className={styles.bankName}>
        <Shimmer />
      </div>
      <div className={styles.cardNo}>
        <Shimmer />
      </div>

      <div className={styles.cvv}>
        {/* <Shimmer /> */}
      </div>
      <div className={styles.cardUser}>
        <Shimmer />
      </div>
      <div className={styles.cardExpiry}>
      </div>
        {/* <Shimmer /> */}
    </div>
  );
};

export default CardSkeleton;
