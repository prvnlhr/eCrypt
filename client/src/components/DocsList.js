import React from "react";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Document from "./Document";
import DocForm from "./DocForm";

import styles from "../css/docsList.module.css";
import btnStyles from "../css/buttons.module.css";
import { FiPlusCircle } from "react-icons/fi";

const DocsList = ({ docs, setHeading }) => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [showEditButton, setEditButton] = useState(true);

  const [formMode, setFormMode] = useState(false);

  useEffect(() => {
    setHeading("Documents");
  }, []);
  const formToggle = () => {
    setFormMode(!formMode);
  };

  return (
    <div className={styles.docsList}>
      {docs.map((doc) => (
        <>
          <Document
            key={doc._id}
            showEditButton={showEditButton}
            setEditButton={setEditButton}
            doc={doc}
          />
        </>
      ))}

      <DocForm formMode={formMode} setFormMode={setFormMode} />

      {formMode === false ? (
        <div className={btnStyles.addBtnDiv} onClick={formToggle}>
          <FiPlusCircle fontSize="19px" />
          <span>Add</span>
        </div>
      ) : null}

      {isLoading === true  ? (
        <div className={styles.loadingDiv}>
          <p>Uploading in Process</p>
          <span>This may take a while</span>
        </div>
      ) : null}
    </div>
  );
};

export default DocsList;
