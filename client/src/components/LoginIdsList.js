import React from "react";
import { useState, useEffect } from "react";

import LoginIdForm from "./LoginIdForm";
import LoginId from "./LoginId";

import styles from "../css/loginList.module.css";
import btnStyles from "../css/buttons.module.css";


import { FiPlusCircle } from "react-icons/fi";



const LoginIdsList = ({
  loginIds,
  currentId,
  setCurrentId,
  setHeading,
}) => {
  const [formMode, setFormMode] = useState(false);
  const [showEditButton, setEditButton] = useState(true);

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
