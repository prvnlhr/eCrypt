import React from "react";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { loginIdFavToggle } from "../actions/loginInIdsAction";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import LoginIdLogo from "./LoginIdLogo";
import styles from "../css/loginId.module.css";
import { Icon, InlineIcon } from "@iconify/react";
import bookmarkFill from "@iconify-icons/bi/bookmark-fill";
import bookmarkStarFill from "@iconify-icons/bi/bookmark-star-fill";
import bookmarkStar from "@iconify-icons/bi/bookmark-star";
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
    <div className={styles.loginContainer}>
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
      <div className={styles.logoDiv}>
        <LoginIdLogo website={favItem.website} />
      </div>
      <div className={styles.infoDiv}>
        <div className={styles.websiteDiv}>
          <p className={styles.websiteText} color="gray">
            {favItem.website}
          </p>
        </div>
        <div className={styles.usernameDiv}>
          <FaUserAlt fontSize="12px" color="gray" />
          <p className={styles.passwordText}>{favItem.username}</p>
        </div>
        <div className={styles.passwordDiv}>
          <FaLock fontSize="12px" color="gray" />
          <p className={styles.passwordText}>{favItem.password}</p>
        </div>
      </div>
    </div>
  );
};
export default FavouriteLoginId;
