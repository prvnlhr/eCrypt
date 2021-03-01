import React, { useState } from "react";
import styles from "../css/searchItem.module.css";
import cardStyles from "../css/card.module.css";
import loginsStyles from "../css/loginId.module.css";
import docStyles from "../css/document.module.css";

import { FaUserAlt, FaLock } from "react-icons/fa";

import LoginIdLogo from "./LoginIdLogo";
import CardLogo from "./CardLogo";

const SearchItem = ({ item }) => {
  const [maximize, setEnlarge] = useState(false);
  const [editId, setEditId] = useState(null);

  const maximizeImg = (docId) => {
    setEditId(item._id);
    setEnlarge(!maximize);
  };

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
          <div className={cardStyles.cardContainer}>
            <div className={cardStyles.cardLogo}>
              <CardLogo className={cardStyles.logo} cardNo={item.cardNo} />
            </div>
            <div className={cardStyles.bankName}>
              <p className={cardStyles.cardText}>{item.bank}</p>
            </div>

            <div className={cardStyles.cardNo}>
              <p className={(cardStyles.cardText, cardStyles.cardNo)}>
                {item.cardNo}
              </p>
            </div>

            <div className={cardStyles.cvv}>
              <p className={cardStyles.cvvLabel}>CVV </p>
              <p className={cardStyles.cvvText}>{item.cvv}</p>
            </div>
            <div className={cardStyles.cardUser}>
              <p className={cardStyles.cardText}>{item.user}</p>
            </div>
            <div className={cardStyles.cardExpiry}>
              <p className={cardStyles.expiryLabel}>VALID UPTO</p>
              <p className={cardStyles.expiryText}>{item.expiry}</p>
            </div>
          </div>
        </>
      ) : item.imageName ? (
        <>
          <div
            className={
              editId === item._id && maximize === true
                ? docStyles.maximize
                : docStyles.documentCard
            }
          >
            <div className={docStyles.imageContainer}>
              <img src={item.imageUrl} onClick={maximizeImg}></img>
            </div>

            <div className={docStyles.imageTitleContainer}>
              <div className={styles.titleDiv}>
                <p className={docStyles.titleText}>{item.imageName}</p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SearchItem;
