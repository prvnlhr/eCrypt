import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewCard, editCard } from "../actions/cardsAction";
import { TextField } from "@material-ui/core";
import { HiX, HiCheck, HiArrowNarrowRight } from "react-icons/hi";
import formStyles from "../css/cardForm.module.css";
import styles from "../css/cardFormNew.module.css";

import btnStyles from "../css/buttons.module.css";

const CardForm = ({ currentId, setCurrentId, formMode, setFormMode }) => {
  const [cardData, setCardData] = useState({
    user: "",
    bank: "",
    cardNo: "",
    expiry: "",
    cvv: "",
    pin: "",
  });

  const [inProcess, setInProcess] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);

  const cardDataToEdit = useSelector((state) =>
    currentId ? state.cards.cards.find((c) => c._id === currentId) : null
  );

  useEffect(() => {
    if (cardDataToEdit) setCardData(cardDataToEdit);
  }, [cardDataToEdit]);

  const confirmSave = () => {
    console.log(cardData);
    if (currentId) {
      dispatch(editCard(currentId, cardData));
    } else {
      dispatch(addNewCard(cardData, userId));
    }
    clear();
    setFormMode(!formMode);
    inProcessing();
  };

  const fromToggle = () => {
    setFormMode(!formMode);
    setInProcess(false);
    clear();
  };
  const inProcessing = () => {
    setInProcess(!inProcess);
  };
  const handleSubmit = (e) => {
    console.log(cardData);
    e.preventDefault();
    inProcessing();
  };
  const handleDateChange = (e) => {
    // console.log(e.target.value, e.target.value.length);
    if (e.target.value.length === 2) {
      setCardData({ ...cardData, expiry: e.target.value + "/" });
    } else if (e.target.value.length === 3) {
      setCardData({
        ...cardData,
        expiry: e.target.value.substring(0, 2),
      });
    } else {
      setCardData({
        ...cardData,
        expiry: e.target.value,
      });
    }

    //     console.log(
    //       e.target.value,e.target.value.substring(0, 2) +"/" +
    // e.target.value.substring(2, 4)
    //     );
  };

  const clear = () => {
    setCurrentId(null);
    setCardData({
      tag: "",
      user: "",
      bank: "",
      cardNo: "",
      expiry: "",
      cvv: "",
      pin: "",
    });
  };

  return (
    <div
      className={formMode ? styles.formComponent : styles.formComponentClose}
    >
      <form className={styles.formTag} onSubmit={handleSubmit}>
        {/* ___HEADING_________ */}
        <div className={styles.headingWrapper}>
          <div className={btnStyles.cancelBtnDiv} onClick={fromToggle}>
            <HiX fontSize="15px" />
          </div>
          <p className={styles.HeadingText}>Add new card</p>
        </div>
        {/* ___CARD NUMBER__________ */}
        <div className={styles.cardNoWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>Card number</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              name="cardNo"
              className={styles.inputField}
              type="text"
              placeholder="Enter 16 digit card number"
              value={cardData.cardNo}
              onChange={(e) =>
                setCardData({ ...cardData, cardNo: e.target.value })
              }
            />
          </div>
        </div>
        <div className={styles.bankNameWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>Bank</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              name="bank"
              className={styles.inputField}
              type="text"
              placeholder="Issuing bank"
              value={cardData.bank}
              onChange={(e) =>
                setCardData({ ...cardData, bank: e.target.value })
              }
            />
          </div>
        </div>

        {/* ___EXPIRY DATE__________ */}
        <div className={styles.expiryDateWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>Expiry date</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              name="expiry"
              type="text"
              value={cardData.expiry}
              placeholder="MM / YY"
              maxLength="5"
              onChange={handleDateChange}
              // (e) =>
              //  setCardData({ ...cardData, expiry: e.target.value })
              //  ,
            />
          </div>
        </div>
        {/* ___CVV__________ */}
        <div className={styles.cvvWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>CVV</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              name="cvv"
              type="text"
              placeholder="000"
              value={cardData.cvv}
              onChange={(e) =>
                setCardData({ ...cardData, cvv: e.target.value })
              }
            />
          </div>
        </div>
        {/* ___CARDHOLDER__________ */}
        <div className={styles.cardHolderWrapper}>
          <div className={styles.labelDiv}>
            <p className={styles.labelText}>Cardholder name</p>
          </div>
          <div className={styles.inputDiv}>
            <input
              className={styles.inputField}
              type="text"
              name="user"
              placeholder="Enter cardholder's full name"
              value={cardData.user}
              onChange={(e) =>
                setCardData({ ...cardData, user: e.target.value })
              }
            />
          </div>
        </div>
        {/* ___BUTTON_________ */}
        <div className={styles.buttonWrapper}>
          <button type="submit" onClick={confirmSave}>
            Add card
          </button>
        </div>
      </form>
    </div>
  );
};
export default CardForm;

{
  /* <div className={formStyles.formHeadingDiv}>
        {currentId ? <p>Edit</p> : <p>Create New</p>}
      </div>

      <div className={formStyles.formDiv}>
        <form className={formStyles.form} onSubmit={handleSubmit}>
          <div className={formStyles.inputContainer}>
            <TextField
              variant="outlined"
              name="user"
              label="user"
              size="small"
              value={cardData.user}
              placeholder="user"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setCardData({ ...cardData, user: e.target.value })
              }
            />
          </div>

          <div className={formStyles.inputContainer}>
            <TextField
              variant="outlined"
              name="bank"
              label="bank"
              size="small"
              value={cardData.bank}
              placeholder="bank"
              onChange={(e) =>
                setCardData({ ...cardData, bank: e.target.value })
              }
            />
          </div>

          <div className={formStyles.inputContainer}>
            <TextField
              variant="outlined"
              name="cardNo"
              label="cardNo"
              size="small"
              value={cardData.cardNo}
              placeholder="cardNo"
              onChange={(e) =>
                setCardData({ ...cardData, cardNo: e.target.value })
              }
            />
          </div>

          <div className={formStyles.inputContainer}>
            <TextField
              variant="outlined"
              name="expiry"
              label="expiry"
              size="small"
              value={cardData.expiry}
              placeholder="expiry"
              onChange={(e) =>
                setCardData({ ...cardData, expiry: e.target.value })
              }
            />
          </div>

          <div className={formStyles.inputContainer}>
            <TextField
              variant="outlined"
              name="cvv"
              label="cvv"
              size="small"
              value={cardData.cvv}
              placeholder="cvv"
              onChange={(e) =>
                setCardData({ ...cardData, cvv: e.target.value })
              }
            />
          </div>
          <div className={formStyles.inputContainer}>
            <TextField
              variant="outlined"
              name="pin"
              label="pin"
              size="small"
              value={cardData.pin}
              placeholder="pin"
              onChange={(e) =>
                setCardData({ ...cardData, pin: e.target.value })
              }
            />
          </div>

          {inProcess === false ? (
            <button type="submit" className={btnStyles.submitBtn}>
              <HiArrowNarrowRight fontSize="20px" />
            </button>
          ) : null}
        </form>
      </div>

      <div className={formStyles.formBtnDiv}>
        {inProcess === true ? (
          <div className={btnStyles.save_cancel_Div}>
            <div className={btnStyles.saveBtnDiv} onClick={confirmSave}>
              <HiCheck fontSize="24px" />
            </div>

            <div className={btnStyles.cancelBtnDiv} onClick={fromToggle}>
              <HiX fontSize="16px" />
            </div>
          </div>
        ) : (
          <div className={btnStyles.cancelBtnDiv} onClick={fromToggle}>
            <HiX fontSize="15px" />
          </div>
        )}
      </div> */
}
