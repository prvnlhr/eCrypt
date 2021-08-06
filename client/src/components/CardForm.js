import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewCard, editCard, clearProcess } from "../actions/cardsAction";
import { TextField } from "@material-ui/core";
import { HiX, HiCheck, HiArrowNarrowRight } from "react-icons/hi";
import formStyles from "../css/cardForm.module.css";
import styles from "../css/cardFormNew.module.css";
import { CircleSpinner } from "react-spinners-kit";

import btnStyles from "../css/buttons.module.css";

const CardForm = ({ currentId, setCurrentId, formMode, setFormMode }) => {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState({
    user: "",
    bank: "",
    cardNo: "",
    expiry: "",
    cvv: "",
    pin: "",
  });

  // const [inProcess, setInProcess] = useState(false);

  //State to hold what to show inside a button______
  const [btnText, setBtnText] = useState("Add card");

  //refs to all input fields________________________
  const userInputRef = useRef();
  const bankInputRef = useRef();
  const cardNoInputRef = useRef();
  const expiryInputRef = useRef();
  const cvvInputRef = useRef();

  //Extracting Process and user state from redux store________
  const userId = useSelector((state) => state.user.user._id);
  const process = useSelector((state) => state.process);

  //THIS WAS USED IN PREVIOUS FORM
  const cardDataToEdit = useSelector((state) =>
    currentId ? state.cards.cards.find((c) => c._id === currentId) : null
  );

  useEffect(() => {
    if (cardDataToEdit) setCardData(cardDataToEdit);
  }, [cardDataToEdit]);

  //___This useEffect keeps track of process state after dispatching
  useEffect(() => {
    if (process.category === "card") {
      if (process.status === "success") {
        successHandler();
      } else if (process.status === "failed") {
        failureHandler();
      }
    }
  }, [process]);

  //___This function is to check if all fields are correct before dispatching addCard()
  const formValidator = () => {
    if (cardData.cardNo.length < 15) {
      //check your cardNo
      cardNoInputRef.current.focus();
    } else if (cardData.expiry.length < 3) {
      //check your expiry date
      expiryInputRef.current.focus();
    } else if (cardData.cvv.length < 3) {
      //check your cvv
      cvvInputRef.current.focus();
    } else if (cardData.bank.length === 0) {
      //check your expiry date
      bankInputRef.current.focus();
    } else if (cardData.user.length === 0) {
      userInputRef.current.focus();
    } else {
      // dispatch add card
      dispatch(addNewCard(cardData, userId));
    }
  };

  //___After button is clicked this function is called and form is validated further
  const confirmSave = () => {
    console.log("form btn clicked");
    formValidator();
  };

  //__Functions form success or failure of form adding
  const successHandler = () => {
    // if success ==> clear form ,toggle formMode == false ,setBtnText back to 'Add card' ,
    // and dispatch action to clear the process state in redux
    clear();
    setFormMode(false);
    setBtnText("Add card");
    dispatch(clearProcess());
  };

  const failureHandler = () => {
    //if failure to add==> setBtnText to 'Retry'
    setBtnText("Retry");
  };

  //___Function to toggle form
  const fromToggle = () => {
    setFormMode(!formMode);
    // setInProcess(false);
    setBtnText("Add card");
    dispatch(clearProcess());
    clear();
  };

  // const inProcessing = () => {
  //   setInProcess(!inProcess);
  // };

  //___This function prevent default behaviour of form submitting
  const handleSubmit = (e) => {
    // console.log(cardData);
    e.preventDefault();
    // inProcessing();
  };

  //___Utility function to format expiry date in inputField MM/YY
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
  };
  //___UTILITY function to clear inputFields on form Closing
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
              ref={cardNoInputRef}
              required
              name="cardNo"
              className={styles.inputField}
              type="text"
              minLength="15"
              maxLength="16"
              placeholder="Enter 15 - 16 digit card number"
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
              ref={bankInputRef}
              required
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
              required
              ref={expiryInputRef}
              name="expiry"
              type="text"
              value={cardData.expiry}
              placeholder="MM / YY"
              maxLength="5"
              minLength="5"
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
              ref={cvvInputRef}
              className={styles.inputField}
              required
              name="cvv"
              type="text"
              minLength="3"
              maxLength="4"
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
              ref={userInputRef}
              className={styles.inputField}
              required
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
          <button
            type="submit"
            onClick={confirmSave}
            disabled={process.inProcess ? true : false}
          >
            {process.inProcess ? (
              <CircleSpinner size={10} color="white" loading={true} />
            ) : (
              <p>{btnText}</p>
            )}
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
