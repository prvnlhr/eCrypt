import React from "react";
import { useDispatch } from "react-redux";
import { loginIdFavToggle } from "../actions/loginInIdsAction";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import LoginIdLogo from "./LoginIdLogo";
import styles from "../css/loginId.module.css";

const FavouriteLoginId = ({ favItem }) => {
  const dispatch = useDispatch();

  const handleFavToggle = (loginCardId, favValue) => {

    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }

    dispatch(loginIdFavToggle(loginCardId, isFav));
  };

  return (
    <div className={styles.cardContainer}>
      <button
        className={styles.favBtn}
        onClick={() => {
          handleFavToggle(favItem._id, favItem.isFavourite);
        }}
      >
        {favItem.isFavourite ? (
          <HiStar className={styles.favIcon} fontSize="18px" color="#4CD7F6" />
        ) : (
          <HiOutlineStar className={styles.favIcon} fontSize="16px" />
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
