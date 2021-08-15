import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { cardFavToggle } from "../actions/cardsAction";
import CardLogo, { getCardType } from "./CardLogo";
import styles from "../css/card.module.css";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";

const FavouriteCard = ({ favItem }) => {
  const dispatch = useDispatch();
  const [currCardData, setCurrCardData] = useState();

  useEffect(() => {
    setCurrCardData(favItem);
  }, [favItem]);
  const cardNumber = favItem.cardNo;
  const cNo = cardNumber.toString();
  const cardType = getCardType(cNo);

  const formattedCardNo = cNo.toString().replace(/\d{4}(?=.)/g, "$& ");
  console.log(formattedCardNo);

  const handleFavToggle = (cardId) => {
    var favValue = currCardData.isFavourite;
    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }
    setCurrCardData({ ...currCardData, isFavourite: isFav });

    dispatch(cardFavToggle(cardId, isFav));
  };

  return (
    <div
      className={`${styles.cardContainer} ${
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
        <p className={styles.cardNoText}>{formattedCardNo}</p>
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

      <div className={styles.buttonDiv}>
        <button
          className={styles.favBtn}
          onClick={() => {
            handleFavToggle(favItem._id, favItem.isFavourite);
          }}
        >
          {(currCardData ? currCardData.isFavourite : favItem.isFavourite) ? (
            <BsBookmarkFill className={styles.favIcon} color="#00b7fd" />
          ) : (
            <BsBookmarkPlus className={styles.favIcon} color="#9baece" />
          )}
        </button>
      </div>

      <h1 className={styles.overlayFont}>{cardType.toLowerCase()}</h1>
      <div className={styles.overlayDiv}></div>
    </div>
  );
};

export default FavouriteCard;
