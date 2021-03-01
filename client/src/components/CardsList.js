import React from "react";
import { useState, useEffect } from "react";

import Card from "./Card";
import CardForm from "./CardForm";

import { FiPlusCircle } from "react-icons/fi";

import styles from "../css/cardsList.module.css";
import btnStyles from "../css/buttons.module.css";

const CardsList = ({ cards, currentId, setCurrentId, setHeading }) => {
  const [formMode, setFormMode] = useState(false);
  const [showEditButton, setEditButton] = useState(true);

  useEffect(() => {
    setHeading("Cards");
  }, []);

  const formToggle = () => {
    setFormMode(!formMode);
  };

  return (
    <div className={`${styles.cardList} `}>
      <div
        className={
          formMode === false
            ? styles.contentContainer
            : styles.contentContainerCollapse
        }
      >
        {cards.map((card) => (
          <>
            <Card
              key={card._id}
              card={card}
              setCurrentId={setCurrentId}
              formMode={formMode}
              setFormMode={setFormMode}
              setEditButton={setEditButton}
              showEditButton={showEditButton}
            />
          </>
        ))}
      </div>

      <CardForm
        currentId={currentId}
        setCurrentId={setCurrentId}
        formMode={formMode}
        setFormMode={setFormMode}
      />

      {formMode === false ? (
        <div className={btnStyles.addBtnDiv} onClick={formToggle}>
          <FiPlusCircle fontSize="19px" />
          <span>Add</span>
        </div>
      ) : null}
    </div>
  );
};

export default CardsList;
