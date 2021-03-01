import React from "react";
import { useDispatch } from "react-redux";
import { cardFavToggle } from "../actions/cardsAction";

import {

  HiStar,
  HiOutlineStar,
} from "react-icons/hi";

import CardLogo from "./CardLogo";
import styles from "../css/card.module.css";

const FavouriteCard = ({ favItem }) => {
  const dispatch = useDispatch();

  const handleFavToggle = (cardId, favValue) => {

    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }

    dispatch(cardFavToggle(cardId, isFav));
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardLogo}>
        <CardLogo className={styles.logo} cardNo={favItem.cardNo} />
      </div>
      <div className={styles.bankName}>
        <p className={styles.cardText}>{favItem.bank}</p>
      </div>

      <div className={styles.cardNo}>
        <p className={(styles.cardText, styles.cardNo)}>{favItem.cardNo}</p>
      </div>

      <div className={styles.cvv}>
        <p className={styles.cvvLabel}>CVV </p>


        <p className={styles.cvvText}>{favItem.cvv}</p>
      </div>
      <div className={styles.cardUser}>
        <p className={styles.cardText}>{favItem.user}</p>
      </div>
      <div className={styles.cardExpiry}>
        <p className={styles.expiryLabel}>VALID UPTO</p>

        <p className={styles.expiryText}>{favItem.expiry}</p>
      </div>

      <button
        className={styles.favBtn}
        onClick={() => {
          handleFavToggle(favItem._id, favItem.isFavourite);
        }}
      >
        {favItem.isFavourite ? (
          <HiStar fontSize="24px" color="#2f89fc" />
        ) : (
          <HiOutlineStar fontSize="16px" color="gray" />
        )}
      </button>
    </div>
  );
};

export default FavouriteCard;
