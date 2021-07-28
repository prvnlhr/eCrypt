import React from "react";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Document from "./Document";
import DocForm from "./DocForm";

import styles from "../css/docsList.module.css";
import noContentStyles from "../css/noContentMessage.module.css";
import btnStyles from "../css/buttons.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { CgAdd } from "react-icons/cg";

const DocsList = ({ docs, setHeading, maxImg, setMaxImg }) => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [showEditButton, setEditButton] = useState(true);
  const crud = useSelector((state) => state.crud);

  const [formMode, setFormMode] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setHeading("Documents");
  }, []);
  const formToggle = () => {
    setFormMode(!formMode);
  };

  return (
    <div className={styles.docsList}>
      <div
        className={
          formMode === false
            ? styles.contentContainer
            : styles.contentContainerCollapse
        }
      >
        {docs.length < 1 === true && crud.operation === "fetching" ? (
          <div className={noContentStyles.messageContainer}>
            <p>Fetching data...</p>
          </div>
        ) : docs.length < 1 && crud.operation === "" ? (
          <div className={noContentStyles.messageContainer}>
            <p>No Documents Added</p>

            <div className={noContentStyles.footerDIv}>
              Click
              <FiPlusCircle className={noContentStyles.icon} fontSize="19px" />
              to add
            </div>
          </div>
        ) : null}

        {docs.map((doc) => (
          <>
            <Document
              key={doc._id}
              showEditButton={showEditButton}
              setEditButton={setEditButton}
              doc={doc}
              maxImg={maxImg}
              setMaxImg={setMaxImg}
            />
          </>
        ))}
      </div>

      <DocForm formMode={formMode} setFormMode={setFormMode} />

      {formMode === false ? (
        <div className={btnStyles.addBtnDiv} onClick={formToggle}>
          <CgAdd fontSize="17px" />
          <span>Add</span>
        </div>
      ) : null}

      {isLoading === true ? (
        <div className={styles.loadingDiv}>
          <p>Uploading in Process ..</p>
          <span>This may take a while</span>
        </div>
      ) : null}
    </div>
  );
};

export default DocsList;
