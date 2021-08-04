import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import LoginIdForm from "./LoginIdForm";
import LoginId from "./LoginId";

import styles from "../css/loginList.module.css";
import noContentStyles from "../css/noContentMessage.module.css";
import btnStyles from "../css/buttons.module.css";

import { FiPlusCircle } from "react-icons/fi";
import { CgAdd } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
const LoginIdsList = ({ loginIds, currentId, setCurrentId, setHeading }) => {
  const [formMode, setFormMode] = useState(false);
  const [showEditButton, setEditButton] = useState(true);

  const crud = useSelector((state) => state.crud);

  useEffect(() => {
    setHeading("LoginIds");
  }, []);

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

  const formToggle = () => {
    setFormMode(!formMode);
  };

  return (
    <div className={styles.loginsList}>
      <div className={styles.contentContainer} ref={node}>
        {loginIds.length === true && crud.operation === "fetching" ? (
          <div className={noContentStyles.messageContainer}>
            <p>Fetching data...</p>
          </div>
        ) : loginIds.length < 1 && crud.operation === "" ? (
          <div className={noContentStyles.messageContainer}>
            <p>No Logins Added</p>

            <div className={noContentStyles.footerDIv}>
              Click
              <FiPlusCircle className={noContentStyles.icon} fontSize="19px" />
              to add
            </div>
          </div>
        ) : null}

        {loginIds.map((loginId) => (
          <React.Fragment key={loginId._id}>
            <LoginId
              loginId={loginId}
              setCurrentId={setCurrentId}
              formMode={formMode}
              setFormMode={setFormMode}
              setEditButton={setEditButton}
              showEditButton={showEditButton}
            />
          </React.Fragment>
        ))}

        <LoginIdForm
          currentId={currentId}
          setCurrentId={setCurrentId}
          formMode={formMode}
          setFormMode={setFormMode}
        />
      </div>

      {formMode == false ? (
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
      ) : null}
    </div>
  );
};

export default LoginIdsList;
