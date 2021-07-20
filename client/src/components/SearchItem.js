import React, { useState } from "react";
import styles from "../css/searchItem.module.css";
import cardStyles from "../css/card.module.css";
import loginsStyles from "../css/loginId.module.css";
import docStyles from "../css/document.module.css";

import { FaUserAlt, FaLock } from "react-icons/fa";

import LoginIdLogo from "./LoginIdLogo";
import CardLogo, { getCardType } from "./CardLogo";

const SearchItem = ({ item }) => {
  const [maximize, setEnlarge] = useState(false);
  const [editId, setEditId] = useState(null);

  const maximizeImg = (docId) => {
    setEditId(item._id);
    setEnlarge(!maximize);
  };
  let formattedCardNo;
  let cNo;
  let cardType;
  if (item.bank) {
    formattedCardNo = item.cardNo.toString().replace(/\d{4}(?=.)/g, "$& ");
    let cardNumber = item.cardNo;
    cNo = cardNumber.toString();
    cardType = getCardType(cNo);
  }
  console.log("number hai", cardType);

  return (
    <>
      {item.website ? (
        <>
          <div className={loginsStyles.cardContainer}>
            <div className={loginsStyles.logoDiv}>
              <LoginIdLogo website={item.website} />
            </div>
            <div className={loginsStyles.infoDiv}>
              <div className={loginsStyles.websiteDiv}>
                <p className={loginsStyles.websiteText} color="gray">
                  {item.website}
                </p>
              </div>
              <div className={loginsStyles.usernameDiv}>
                <FaUserAlt fontSize="12px" color="gray" />
                <p className={loginsStyles.passwordText}>{item.username}</p>
              </div>
              <div className={loginsStyles.passwordDiv}>
                <FaLock fontSize="12px" color="gray" />
                <p className={loginsStyles.passwordText}>{item.password}</p>
              </div>
            </div>
          </div>
        </>
      ) : item.bank ? (
        <>
          <div
            className={`${cardStyles.cardContainer} ${
              cardType === "MASTER"
                ? cardStyles.cardMaster
                : cardType === "VISA"
                ? cardStyles.cardVisa
                : cardType === "RUPAY"
                ? cardStyles.cardRupay
                : cardType === "MAESTRO"
                ? cardStyles.cardMaestro
                : cardType === "AMEX"
                ? cardStyles.cardAmex
                : cardType === "JCB"
                ? cardStyles.cardJcb
                : cardType === "HIPERCARD"
                ? cardStyles.cardHiper
                : cardType === "UNIONPAY"
                ? cardStyles.cardUnion
                : cardType === "DISCOVERY"
                ? cardStyles.cardDiscovery
                : cardType === "DINERS"
                ? cardStyles.cardDiners
                : null
            }`}
          >
            <div className={cardStyles.cardLogo}>
              <CardLogo className={cardStyles.logo} cardNo={item.cardNo} />
            </div>
            <div className={cardStyles.bankName}>
              <p className={cardStyles.cardBankText}>{item.bank}</p>
            </div>

            <div className={cardStyles.cardNo}>
              <p className={cardStyles.cardNoText}>{formattedCardNo}</p>
            </div>

            <div className={cardStyles.cvv}>
              <p className={cardStyles.cvvLabel}>CVV </p>
              <p className={cardStyles.cvvText}>{item.cvv}</p>
            </div>
            <div className={cardStyles.cardUser}>
              <p className={cardStyles.cardUserText}>{item.user}</p>
            </div>
            <div className={cardStyles.cardExpiry}>
              <p className={cardStyles.expiryLabel}>VALID UPTO</p>
              <p className={cardStyles.expiryText}>{item.expiry}</p>
            </div>
            <h1 className={cardStyles.overlayFont}>{cardType.toLowerCase()}</h1>
            <div className={cardStyles.overlayDiv}></div>
          </div>
        </>
      ) : item.imageName ? (
        <>
          <div
            className={
              editId === item._id && maximize === true
                ? styles.maximize
                : styles.documentCard
            }
          >
            <div className={styles.imageContainer}>
              <img src={item.imageUrl} onClick={maximizeImg}></img>
            </div>

            <div className={styles.imageTitleContainer}>
              <div className={styles.titleDiv}>
                {maximize === false ? (
                  <p className={styles.titleText}>{item.imageName}</p>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SearchItem;
