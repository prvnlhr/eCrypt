import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { cardFavToggle } from "../../actions/cardsAction";
import CardLogo, { getCardType } from "../card/CardLogo";
import styles from "../../css/card/card.module.css";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { motion } from "framer-motion";
import BookmarkPlus from "../icons/BookmarkPlus";
import BookmarkFill from "../icons/BookmarkFill";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1],
      }}
      transition={{ duration: 0.3, delay: 0.2 }}
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
             <BookmarkFill
             className={styles.favIcon}
             primaryColor={"#2882FF"}
             secondaryColor={"white"}
           />
          ) : (
            <BookmarkPlus
            className={styles.favIcon}
            primaryColor={"#9baece"}
               secondaryColor={"#2882FF"}
          />
          )}
        </button>
      </div>

      <div className={styles.overlayDiv}>
        <div className={styles.ring}>
          <div></div>
        </div>
        <div className={styles.square}></div>

        <h1 className={styles.overlayFont}>{cardType}</h1>
      </div>
    </motion.div>
  );
};

export default FavouriteCard;
