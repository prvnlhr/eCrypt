import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, editCard } from "../actions/cardsAction";
import { cardFavToggle } from "../actions/cardsAction";
import { CgTrashEmpty } from "react-icons/cg";
import { CircleSpinner } from "react-spinners-kit";
import { CgCloseO } from "react-icons/cg";
import { IoMdTrash } from "react-icons/io";

import { HiPencil, HiCheck, HiX, HiStar, HiOutlineStar } from "react-icons/hi";
import CardLogo, { getCardType } from "./CardLogo";
import modalStyles from "../css/modal.module.css";
import styles from "../css/card.module.css";
// new icons set
import { Icon, InlineIcon } from "@iconify/react";
import bookmarkFill from "@iconify-icons/bi/bookmark-fill";
import pencilIcon from "@iconify-icons/akar-icons/pencil";
import bookmarkStarFill from "@iconify-icons/bi/bookmark-star-fill";
import bookmarkStar from "@iconify-icons/bi/bookmark-star";
import circleXFill from "@iconify-icons/akar-icons/circle-x-fill";
import circleCheckFill from "@iconify-icons/akar-icons/circle-check-fill";
import checkIcon from "@iconify-icons/bi/check";
import xLg from "@iconify-icons/bi/x-lg";
import trashEmpty from "@iconify-icons/gg/trash-empty";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";

const Card = ({ card, setEditButton, showEditButton, index }) => {
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
  const [currCardData, setCurrCardData] = useState();

  // determining the card type___________
  const cardNumber = card.cardNo;
  const cNo = cardNumber.toString();
  const cardType = getCardType(cNo);
  // console.log("cardType is ", cardType);
  //________________________________________

  const formattedCardNo = cNo.toString().replace(/\d{4}(?=.)/g, "$& ");
  // console.log(formattedCardNo);

  const cardDataToEdit = useSelector((state) =>
    editId ? state.cards.cards.find((c) => c._id === editId) : null
  );

  useEffect(() => {
    if (cardDataToEdit) setCardData(cardDataToEdit);
  }, [cardDataToEdit]);

  const userId = useSelector((state) => state.user.user._id);
  const crud = useSelector((state) => state.crud);

  useEffect(() => {
    setCurrCardData(card);
  }, []);

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
  const save = (id) => {
    dispatch(editCard(id, cardData, userId));
  };

  const confirmDelete = (cardId) => {
    dispatch(deleteCard(card, cardId, userId));
    setModalShow(!modalShow);
  };
  const handleDeleteClick = () => {
    setModalShow(!modalShow);
  };
  return (
    <div
      key={index}
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
      <div className={styles.buttonDiv}>
        {inEditMode === true ? (
          <div className={styles.checkCancelContainer}>
            <div
              className={styles.cancelIconDiv}
              onClick={() => {
                setEditId(null);
                setInEditMode(false);
                setEditButton(true);
              }}
            >
              <HiX color="#9baece" className={styles.cancelIcon} />
            </div>
            <div
              className={styles.checkIconDiv}
              onClick={() => {
                save(card._id);
                setInEditMode(false);
                setEditId(null);
                setEditButton(true);
              }}
            >
              <HiCheck color="#9baece" className={styles.checkIcon} />
            </div>
          </div>
        ) : (
          <>
            {showEditButton && inEditMode === false ? (
              <div className={styles.editDeleteContainer}>
                <div
                  className={styles.editIconDiv}
                  onClick={() => {
                    setEditButton(null);
                    setEditId(card._id);
                    setInEditMode(true);
                  }}
                >
                  {crud.inProcess &&
                  crud.itemId === card._id &&
                  crud.operation === "edit" ? (
                    <CircleSpinner size={10} color="#9baece" loading={true} />
                  ) : (
                    <Icon
                      icon={pencilIcon}
                      className={styles.pencilIcon}
                      color="#9baece"
                    />
                  )}
                </div>
                <div
                  className={styles.deleteIconDiv}
                  onClick={() => {
                    handleDeleteClick();
                  }}
                >
                  {crud.inProcess &&
                  crud.itemId === card._id &&
                  crud.operation === "delete" ? (
                    <CircleSpinner size={10} color="#9baece" loading={true} />
                  ) : (
                    <Icon
                      icon={trashEmpty}
                      className={styles.trashIcon}
                      color="#9baece"
                    />
                  )}
                </div>
              </div>
            ) : null}
          </>
        )}

        <button
          className={styles.favBtn}
          onClick={() => {
            handleFavToggle(card._id, card.isFavourite);
          }}
        >
          {(currCardData ? currCardData.isFavourite : card.isFavourite) ? (
            <BsBookmarkFill className={styles.favIcon} color="#00b7fd" />
          ) : (
            <BsBookmarkPlus className={styles.favIcon} color="#9baece" />
          )}
        </button>
      </div>

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
              {crud.inProcess && crud.itemId === card._id ? (
                <CircleSpinner size={12} color="white" loading={true} />
              ) : (
                <p>Sure, Delete ! </p>
              )}
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
          <p className={styles.cardBankText}>{card.bank}</p>
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
          <p className={styles.cardNoText}>{formattedCardNo}</p>
        )}
      </div>
      <div className={styles.cvv}>
        <p className={styles.cvvLabel}>CVV </p>

        {inEditMode && card._id === editId ? (
          <input
            className={styles.expiryInput}
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
          <p className={styles.cardUserText}>{card.user}</p>
        )}
      </div>
      <div className={styles.cardExpiry}>
        <p className={styles.expiryLabel}>VALID UPTO</p>

        {inEditMode && card._id === editId ? (
          <input
            className={styles.expiryInput}
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

      <div className={styles.overlayDiv}>
        <h1 className={styles.overlayFont}>{cardType}</h1>
      </div>
    </div>
  );
};
export default Card;
