import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewCard, editCard } from "../actions/cardsAction";
import { TextField } from "@material-ui/core";
import { HiX, HiCheck, HiArrowNarrowRight } from "react-icons/hi";
import formStyles from "../css/cardForm.module.css";
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
    e.preventDefault();
    inProcessing();
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
      className={
        formMode === false
          ? formStyles.formContainerCollapse
          : formStyles.formContainer
      }
    >
      <div className={formStyles.formHeadingDiv}>
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
      </div>
    </div>
  );
};
export default CardForm;
