import React from "react";
import { useDispatch } from "react-redux";
import { cardFavToggle } from "../actions/cardsAction";

import { HiStar, HiOutlineStar } from "react-icons/hi";

import CardLogo, { getCardType } from "./CardLogo";
import styles from "../css/card.module.css";

const FavouriteCard = ({ favItem }) => {
  const dispatch = useDispatch();

  const cardNumber = favItem.cardNo;
  const cNo = cardNumber.toString();
  const cardType = getCardType(cNo);

  const formattedCardNo = cNo.toString().replace(/\d{4}(?=.)/g, "$& ");
  console.log(formattedCardNo);

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
    <div className=
    {`${styles.cardContainer} ${
      cardType === "MASTER"
        ? styles.cardMaster
        : cardType === "VISA"
        ? styles.cardVisa
        : cardType === "RUPAY"
        ? styles.cardRupay
        : cardType === "MAESTRO"
        ? styles.cardMaestro
        : cardType === "AMEX"
        ? styles.cardAmex
        : cardType === "JCB"
        ? styles.cardJcb
        : cardType === "HIPERCARD"
        ? styles.cardHiper
        : cardType === "UNIONPAY"
        ? styles.cardUnion
        : cardType === "DISCOVERY"
        ? styles.cardDiscovery
        : cardType === "DINERS"
        ? styles.cardDiners
        : null
    }`}
    >
      <div className={styles.cardLogo}>
        <CardLogo className={styles.logo} cardNo={favItem.cardNo} />
      </div>
      <div className={styles.bankName}>
        <p className={styles.cardBankText}>{favItem.bank}</p>
      </div>

      <div className={styles.cardNo}>
        <p className={(styles.cardNoText)}>{formattedCardNo}</p>
      </div>

      <div className={styles.cvv}>
        <p className={styles.cvvLabel}>CVV </p>

        <p className={styles.cvvText}>{favItem.cvv}</p>
      </div>
      <div className={styles.cardUser}>
        <p className={styles.cardUserText}>{favItem.user}</p>
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
          <HiStar fontSize="24px" color="#4CD7F6" />
        ) : (
          <HiOutlineStar fontSize="16px" color="gray" />
        )}
      </button>
      <h1 className={styles.overlayFont}>{cardType.toLowerCase()}</h1>
      <div className={styles.overlayDiv}></div>
    </div>
  );
};

export default FavouriteCard;
