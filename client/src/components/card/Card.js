import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, editCard } from "../../actions/cardsAction";
import { cardFavToggle } from "../../actions/cardsAction";
import { CircleSpinner } from "react-spinners-kit";
import styles from "../../css/card/card.module.css";
import CardLogo, { getCardType } from "./CardLogo";
import modalStyles from "../../css/modal/modal.module.css";
import { motion } from "framer-motion";
//icons set
import { Icon, InlineIcon } from "@iconify/react";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import TrashIcon from "../icons/TrashIcon";
import BookmarkPlus from "../icons/BookmarkPlus";
import BookmarkFill from "../icons/BookmarkFill";
import PencilIcon from "../icons/PencilIcon";

const Card = ({ card, setEditButton, showEditButton, index }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [inEditMode, setInEditMode] = useState(false);
  const [oldCardData, setOldCardData] = useState("");
  const [cardData, setCardData] = useState({
    user: "",
    bank: "",
    cardNo: "",
    expiry: "",
    cvv: "",
    pin: "",
  });
  const [currCardData, setCurrCardData] = useState();
  // const process = useSelector((state) => state.process);
  const loadState = useSelector((state) => state.loading);
  const { itemId, place, isLoading, process } = loadState;
  const searchResultArray = useSelector(
    (state) => state.searchResults.searchResults
  );

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

  useEffect(() => {
    setCurrCardData(card);
    setOldCardData(card);
  }, [card]);

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
    dispatch(
      editCard(id, cardData, userId, oldCardData, searchResultArray.length)
    );
  };

  const confirmDelete = (cardId) => {
    dispatch(deleteCard(card, cardId, userId));
    setModalShow(!modalShow);
  };
  const handleDeleteClick = () => {
    setModalShow(!modalShow);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1],
      }}
      transition={{ duration: 0.3, delay: 0.2 }}
      key={index}
      className={`${styles.cardContainer} ${
        inEditMode ? styles.cardContainerInEditMode : null
      }`}
    >
      <div className={styles.buttonDiv}>
        <div className={styles.editBtnsContainer}>
          {inEditMode === true ? (
            <>
              <div
                className={styles.cancelIconDiv}
                onClick={() => {
                  setEditId(null);
                  setInEditMode(false);
                  setEditButton(true);
                }}
              >
                <Icon
                  icon="heroicons-solid:x"
                  color="#9baece"
                  className={styles.cancelIcon}
                />
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
                <Icon
                  icon="heroicons-solid:check"
                  color="#9baece"
                  className={styles.checkIcon}
                />
              </div>
            </>
          ) : (
            <>
              {showEditButton && inEditMode === false ? (
                <>
                  <div
                    className={styles.editIconDiv}
                    onClick={() => {
                      setEditButton(null);
                      setEditId(card._id);
                      setInEditMode(true);
                    }}
                  >
                    {isLoading === true &&
                    place === "card" &&
                    itemId === card._id &&
                    process === "edit" ? (
                      <CircleSpinner size={15} color="#1072f1" loading={true} />
                    ) : (
                      // <Ripples color={"blue"} during={1200}>
                      // <button type="button">

                      // <Icon
                      //   icon="akar-icons:pencil"
                      //   className={styles.pencilIcon}
                      //   color="#9baece"
                      // />
                      <PencilIcon
                      className={styles.pencilIcon}
                      primaryColor={"#9baece"}
                      secondaryColor={"#9baece"}
                    />
                      // </button>
                      // </Ripples>
                    )}
                  </div>
                  <div
                    className={styles.deleteIconDiv}
                    onClick={() => {
                      handleDeleteClick();
                    }}
                  >
                    {isLoading === true &&
                    place === "card" &&
                    itemId === card._id &&
                    process === "delete" ? (
                      <CircleSpinner size={15} color="#1072f1" loading={true} />
                    ) : (
                      // <Icon
                      //   icon="feather:trash"
                      //   // icon="eva:trash-fill"
                      //   className={styles.trashIcon}
                      //   color="#9baece"
                      // />
                      <TrashIcon
                      className={styles.trashIcon}
                      primaryColor={"#9baece"}
                      secondaryColor={"#9baece"}
                    />
                    )}
                  </div>
                </>
              ) : null}
            </>
          )}
        </div>

        <button
          className={styles.favBtn}
          onClick={() => {
            handleFavToggle(card._id, card.isFavourite);
          }}
        >
          {(currCardData ? currCardData.isFavourite : card.isFavourite) ? (
            // <BsBookmarkFill className={styles.favIcon} color="#00b7fd" />
            <BookmarkFill
            className={styles.favIcon}
            primaryColor={"#9baece"}
            secondaryColor={"#00b7fd"}
          />

          ) : (
            // <BsBookmarkPlus className={styles.favIcon} color="#9baece" />
            <BookmarkPlus
              className={styles.favIcon}
              primaryColor={"#9baece"}
              secondaryColor={"#9baece"}
            />
         
         )}
        </button>
      </div>

      {modalShow === true ? (
        <div className={modalStyles.modalContainer}>
          <div className={modalStyles.dialogDiv}>
          <Icon icon="carbon:warning" className={modalStyles.icon} />

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
              {isLoading === true &&
              place === "card" &&
              itemId === card._id &&
              process === "delete" ? (
                <CircleSpinner size={12} color="white" loading={true} />
              ) : (
                <p>Delete</p>
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
        <div className={styles.square}></div>
        <div className={styles.ring}>
          <div></div>
        </div>

        <h1 className={styles.overlayFont}>{cardType}</h1>
      </div>
    </motion.div>
  );
};
export default Card;
