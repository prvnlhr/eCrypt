import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, editCard } from "../actions/cardsAction";
import { cardFavToggle } from "../actions/cardsAction";
import { CgTrashEmpty } from "react-icons/cg";
import {
  HiOutlinePencil,
  HiCheck,
  HiX,
  HiStar,
  HiOutlineStar,
} from "react-icons/hi";

import CardLogo from "./CardLogo";
import modalStyles from "../css/modal.module.css";
import styles from "../css/card.module.css";

const Card = ({
  card,
  setEditButton,
  showEditButton,
}) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [inEditMode, setInEditMode] = useState(false);
  const [cardData, setCardData] = useState({
    user: "",
    bank: "",
    cardNo: "",
    expiry: "",
    cvv: "",
    pin: "",
  });

  const cardDataToEdit = useSelector((state) =>
    editId ? state.cards.cards.find((c) => c._id === editId) : null
  );

  useEffect(() => {
    if (cardDataToEdit) setCardData(cardDataToEdit);
  }, [cardDataToEdit]);

  const userId = useSelector((state) => state.user.user._id);

  const handleFavToggle = (cardId, favValue) => {

    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }

    dispatch(cardFavToggle(cardId, isFav));
  };
  const save = (id) => {
    dispatch(editCard(id, cardData, userId));
  };

  const confirmDelete = (cardId) => {
    dispatch(deleteCard(card, cardId, userId));
  };
  const handleDeleteClick = () => {
    setModalShow(!modalShow);
  };

 
  return (
    <div
      className={styles.cardContainer}
     
    >
      {inEditMode === true ? (
        <div className={styles.saveCancelDiv}>
          <div
            className={styles.cancelIcon}
            onClick={() => {
              setEditId(null);
              setInEditMode(false);
              setEditButton(true);
            }}
          >
            <HiX />
          </div>
          <div
            className={styles.saveIcon}
            onClick={() => {
              save(card._id);
              setInEditMode(false);
              setEditId(null);
              setEditButton(true);
            }}
          >
            <HiCheck />
          </div>
        </div>
      ) : (
        <>
          {showEditButton && inEditMode === false ? (
            <div className={styles.editDeleteDiv}>
              <div
                className={styles.editIcon}
                onClick={() => {
                  setEditButton(null);
                  setEditId(card._id);
                  setInEditMode(true);
                }}
              >
                <HiOutlinePencil />
              </div>
              <div
                className={styles.deleteIcon}
                onClick={() => {
                  handleDeleteClick();
                }}
              >
                <CgTrashEmpty />
              </div>
            </div>
          ) : null}
        </>
      )}

      {modalShow === true ? (
        <div className={modalStyles.modalContainer}>
          <div className={modalStyles.dialogDiv}>
            <p>Are you sure you want to delete this item permanently ?</p>
          </div>
          <div className={modalStyles.modalBtnDiv}>
            <div
              className={modalStyles.modalCancelBtn}
              onClick={() => {
                setModalShow(!modalShow);
              }}
            >
              <p>Cancel</p>
            </div>
            <div
              className={modalStyles.modalConfirmBtn}
              onClick={() => {
                confirmDelete(card._id);
              }}
            >
              <p>Sure, Delete ! </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.cardLogo}>
        <CardLogo className={styles.logo} cardNo={card.cardNo} />
      </div>

      <div className={styles.bankName}>
        {inEditMode && card._id === editId ? (
          <input
            className={styles.editInput}
            value={cardData.bank}
            onChange={(e) =>
              setCardData({
                ...cardData,
                bank: e.target.value,
              })
            }
          ></input>
        ) : (
          <p className={styles.cardText}>{card.bank}</p>
        )}
      </div>

      <div className={styles.cardNo}>
        {inEditMode && card._id === editId ? (
          <input
            className={styles.editInput}
            value={cardData.cardNo}
            onChange={(e) =>
              setCardData({
                ...cardData,
                cardNo: e.target.value,
              })
            }
          ></input>
        ) : (
          <p className={(styles.cardText, styles.cardNo)}>{card.cardNo}</p>
        )}
      </div>
      <div className={styles.cvv}>
        <p className={styles.cvvLabel}>CVV </p>


        {inEditMode && card._id === editId ? (
          <input
            className={styles.editInput}
            value={cardData.cvv}
            onChange={(e) =>
              setCardData({
                ...cardData,
                cvv: e.target.value,
              })
            }
          ></input>
        ) : (
          <p className={styles.cvvText}>{card.cvv}</p>
        )}
      </div>
      <div className={styles.cardUser}>
        {inEditMode && card._id === editId ? (
          <input
            className={styles.editInput}
            value={cardData.user}
            onChange={(e) =>
              setCardData({
                ...cardData,
                user: e.target.value,
              })
            }
          ></input>
        ) : (
          <p className={styles.cardText}>{card.user}</p>
        )}
      </div>
      <div className={styles.cardExpiry}>
        <p className={styles.expiryLabel}>VALID UPTO</p>

        {inEditMode && card._id === editId ? (
          <input
            className={styles.editInput}
            value={cardData.expiry}
            onChange={(e) =>
              setCardData({
                ...cardData,
                expiry: e.target.value,
              })
            }
          ></input>
        ) : (
          <p className={styles.expiryText}>{card.expiry}</p>
        )}
      </div>

      <button
        className={styles.favBtn}
        onClick={() => {
          handleFavToggle(card._id, card.isFavourite);
        }}
      >
        {card.isFavourite ? (
          <HiStar fontSize="24px" color="#2f89fc" />
        ) : (
          <HiOutlineStar fontSize="16px" />
        )}
      </button>

    </div>
  );
};
export default Card;
