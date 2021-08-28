import React from "react";
import styles from "../../css/app_layout/notFound.module.css";
import image from "../../img/404.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.notFoundComponent}>
      <div className={styles.imgDiv}>
        <img src={image} alt="404" />
      </div>
      <div className={styles.footerDiv}>
        <p className={styles.text1}>Looks like you're lost</p>
        <p className={styles.text2}>Want to reach home safely</p>
        <button>
          <Link to="/" className={styles.link}>
            Go Home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
