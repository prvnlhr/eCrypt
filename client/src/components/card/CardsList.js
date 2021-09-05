import React from "react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
// import CardForm from "./CardForm";
import { FiPlusCircle } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import CardSkeleton from "../skeletons/CardSkeleton";

import styles from "../../css/card/cardsList.module.css";
import noContentStyles from "../../css/document/noContentMessage.module.css";
import btnStyles from "../../css/add_button/buttons.module.css";
import { CircleSpinner } from "react-spinners-kit";
const CardForm = lazy(() => import("./CardForm"));

const CardsList = ({ cards, currentId, setCurrentId, setHeading }) => {
  const [formMode, setFormMode] = useState(false);
  const [showEditButton, setEditButton] = useState(true);

  const loadState = useSelector((state) => state.loading);

  const { place, isLoading, cardFetching } = loadState;

  useEffect(() => {
    setHeading("Cards");
  }, []);

  useEffect(() => {}, [cards.length]);

  const formToggle = () => {
    setFormMode(!formMode);
  };

  // SCROLLING BUTTON HIDE__
  const node = useRef();
  var timeOut = null;
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    if (node.current != null) {
      node.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (node.current != null) {
        node.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = (e) => {
    setIsScrolling(true);
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
  };

  return (
    <div className={`${styles.cardList} `}>
      <div className={styles.contentContainer} ref={node}>
        {/* <CardSkeleton /> */}

        {cardFetching === true && cards.length < 1 ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : cardFetching === false && cards.length < 1 ? (
          <div className={noContentStyles.messageContainer}>
            <p>No Logins Added</p>

            <div className={noContentStyles.footerDIv}>
              Click
              <FiPlusCircle className={noContentStyles.icon} fontSize="19px" />
              to add
            </div>
          </div>
        ) : (
          cardFetching === false &&
          cards.length >= 1 && 
          (
            <>
              {cards.map((card, index) => (
                <>
                  <Card
                    index={index}
                    card={card}
                    setCurrentId={setCurrentId}
                    formMode={formMode}
                    setFormMode={setFormMode}
                    setEditButton={setEditButton}
                    showEditButton={showEditButton}
                  />
                </>
              ))}
            </>
          )
        )}
      </div>
      <Suspense
        fallback={
          <div>
            <CircleSpinner size={12} color="gray" loading={true} />
          </div>
        }
      >
        <CardForm
          currentId={currentId}
          setCurrentId={setCurrentId}
          formMode={formMode}
          setFormMode={setFormMode}
        />
      </Suspense>

      {formMode === false ? (
        // <div className={btnStyles.addBtnWrapper}>
        <div
          className={
            isScrolling === false
              ? btnStyles.addBtnWrapper
              : btnStyles.addBtnWrapperHidden
          }
          onClick={formToggle}
        >
          <div className={btnStyles.addBtnIconDIv}>
            <HiPlus />
          </div>
          <div className={btnStyles.addBtnTextDiv}>
            <p>Add</p>
          </div>
        </div>
      ) : // </div>
      null}
    </div>
  );
};

export default CardsList;
