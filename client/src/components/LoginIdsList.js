import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import LoginIdForm from "./LoginIdForm";
import LoginId from "./LoginId";

import styles from "../css/loginList.module.css";
import noContentStyles from "../css/noContentMessage.module.css";
import btnStyles from "../css/buttons.module.css";

import { FiPlusCircle } from "react-icons/fi";

const LoginIdsList = ({ loginIds, currentId, setCurrentId, setHeading }) => {
  const [formMode, setFormMode] = useState(false);
  const [showEditButton, setEditButton] = useState(true);
  const crud = useSelector((state) => state.crud);

  useEffect(() => {
    setHeading("LoginIds");
  }, []);

  const formToggle = () => {
    setFormMode(!formMode);
  };

  return (
    <div className={styles.loginsList}>
      <div
        className={
          formMode === false
            ? styles.contentContainer
            : styles.contentContainerCollapse
        }
      >
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
          <>
            <LoginId
              loginId={loginId}
              setCurrentId={setCurrentId}
              formMode={formMode}
              setFormMode={setFormMode}
              setEditButton={setEditButton}
              showEditButton={showEditButton}
            />
          </>
        ))}
      </div>
      <LoginIdForm
        currentId={currentId}
        setCurrentId={setCurrentId}
        formMode={formMode}
        setFormMode={setFormMode}
      />

      {formMode == false ? (
        <div className={btnStyles.addBtnDiv} onClick={formToggle}>
          <FiPlusCircle fontSize="19px" />
          <span>Add</span>
        </div>
      ) : null}
    </div>
  );
};

export default LoginIdsList;
