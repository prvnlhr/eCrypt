import React from "react";
import uuid from "react-uuid";

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Document from "./Document";
import DocForm from "./DocForm";

import styles from "../css/docsList.module.css";
import noContentStyles from "../css/noContentMessage.module.css";
import btnStyles from "../css/buttons.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { CgAdd } from "react-icons/cg";

const DocsList = ({
  docs,
  setHeading,
  imageData,
  setImageData,
  maximizeOrNot,
  setMaximizeOrNot,
  showHeaderFooter,
  setShowHeaderFooter,
}) => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [showEditButton, setEditButton] = useState(true);

  const [btnExpandId, setBtnExpandId] = useState(null);
  const [btnExpand, setBtnExpand] = useState(false);

  const crud = useSelector((state) => state.crud);

  const [formMode, setFormMode] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setHeading("Documents");
  }, []);
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
    <div className={styles.docsList}>
      <div className={styles.contentContainer} ref={node}>
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

        {docs.map((doc, i) => (
          <Document
            key={i}
            showEditButton={showEditButton}
            setEditButton={setEditButton}
            doc={doc}
            btnExpandId={btnExpandId}
            setBtnExpandId={setBtnExpandId}
            btnExpand={btnExpand}
            setBtnExpand={setBtnExpand}
            imageData={imageData}
            setImageData={setImageData}
            maximizeOrNot={maximizeOrNot}
            setMaximizeOrNot={setMaximizeOrNot}
            showHeaderFooter={showHeaderFooter}
            setShowHeaderFooter={setShowHeaderFooter}
          />
        ))}
      </div>

      <DocForm formMode={formMode} setFormMode={setFormMode} />

      {formMode === false ? (
        <div
          className={
            isScrolling === false
              ? btnStyles.addBtnDiv
              : btnStyles.addBtnDivHidden
          }
          onClick={formToggle}
        >
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
