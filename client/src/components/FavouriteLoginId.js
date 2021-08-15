import React from "react";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { loginIdFavToggle } from "../actions/loginInIdsAction";
import { FaUserAlt, FaLock } from "react-icons/fa";
import LoginIdLogo from "./LoginIdLogo";
import styles from "../css/loginIdComponent.module.css";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";

const FavouriteLoginId = ({ favItem }) => {
  const dispatch = useDispatch();
  const [currLoginIdData, setCurrLoginIdData] = useState();

  useEffect(() => {
    setCurrLoginIdData(favItem);
  }, [favItem]);
  const handleFavToggle = (loginCardId) => {
    var favValue = currLoginIdData.isFavourite;
    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }
    setCurrLoginIdData({ ...currLoginIdData, isFavourite: isFav });
    dispatch(loginIdFavToggle(loginCardId, isFav));
  };

  return (
    <div className={styles.loginIdContainer}>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.favBtn}
          onClick={() => {
            handleFavToggle(favItem._id, favItem.isFavourite);
          }}
        >
          {(
            currLoginIdData ? currLoginIdData.isFavourite : favItem.isFavourite
          ) ? (
            <BsBookmarkFill className={styles.favIcon} color="#00b7fd" />
          ) : (
            <BsBookmarkPlus className={styles.favIcon} color="#9baece" />
          )}
        </button>
      </div>
      <div className={styles.logoWrapper}>
        <div className={styles.logoDiv}>
          <LoginIdLogo website={favItem.website} />
        </div>
      </div>
      <div className={styles.websiteWrapper}>
        <div className={styles.websiteDiv}>
          <p className={styles.websiteText} color="gray">
            {favItem.website}
          </p>
        </div>
      </div>

      <div className={styles.userNameWrapper}>
        <div className={styles.iconDiv}>
          <FaUserAlt />
        </div>
        <div className={styles.textDiv}>
          <p>{favItem.username}</p>
        </div>
      </div>
      <div className={styles.passwordWrapper}>
        <div className={styles.iconDiv}>
          <FaLock />
        </div>
        <div className={styles.textDiv}>
          <p>{favItem.password}</p>
        </div>
      </div>
    </div>
  );
};
export default FavouriteLoginId;
