import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Document from "./Document";
import DocForm from "./DocForm";

import styles from "../../css/document/docsList.module.css";
import noContentStyles from "../../css/document/noContentMessage.module.css";
import btnStyles from "../../css/add_button/buttons.module.css";
import DocSkeleton from "../skeletons/DocSkeleton";
import { FiPlusCircle } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { CircleSpinner } from "react-spinners-kit";

const DocsList = ({
  docs,
  setHeading,
  imageData,
  setImageData,
  maximizeOrNot,
  setMaximizeOrNot,
  showHeaderFooter,
  setShowHeaderFooter,
  currDeletingDocId,
}) => {
  // const isLoading = useSelector((state) => state.loading.isLoading);
  const [showEditButton, setEditButton] = useState(true);

  const [btnExpandId, setBtnExpandId] = useState(null);
  const [btnExpand, setBtnExpand] = useState(false);
  const loadState = useSelector((state) => state.loading);
  // const loading = useSelector((state) => state.process);

  // const { category, inProcess, status, process } = loading;

  const [formMode, setFormMode] = useState(false);
  const { place, isLoading, process } = loadState;

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
        {/* <DocSkeleton /> */}
        {isLoading === true && place === "docsList" && docs.length < 1 ? (
          <>
            <DocSkeleton />
            <DocSkeleton />
            <DocSkeleton />
            <DocSkeleton />
            <DocSkeleton />
            <DocSkeleton />
          </>
        ) : isLoading === false && docs.length < 1 ? (
          <div className={noContentStyles.messageContainer}>
            <p>No Logins Added</p>

            <div className={noContentStyles.footerDIv}>
              Click
              <FiPlusCircle className={noContentStyles.icon} fontSize="19px" />
              to add
            </div>
          </div>
        ) : (
          docs.length >= 1 && (
            <>
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
                  currDeletingDocId={currDeletingDocId}
                />
              ))}
            </>
          )
        )}
      </div>

      <DocForm formMode={formMode} setFormMode={setFormMode} />

      {formMode === false ? (
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

      {isLoading === true && place === "doc" && process === "add" ? (
        <div className={styles.loadingDiv}>
          <div className={styles.loadingHeader}>
            <p>Upload in progress</p>
            <CircleSpinner size={12} color="#2f89fc" loading={true} />
          </div>
          <div className={styles.loadingFooter}>
            <p>This may take a while</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DocsList;
