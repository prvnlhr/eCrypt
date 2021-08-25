import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteDoc,
  editDoc,
  docFavToggle,
} from "../../actions/documentsAction";
import styles from "../../css/document/docMaximize.module.css";
import { motion } from "framer-motion";

//ICONS IMPORTS_____//
import { HiX, HiCheck, HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { CircleSpinner } from "react-spinners-kit";
import { Icon, InlineIcon } from "@iconify/react";
import pencilIcon from "@iconify-icons/akar-icons/pencil";
import trashEmpty from "@iconify-icons/gg/trash-empty";
import starSolid from "@iconify-icons/clarity/star-solid";
import starLine from "@iconify-icons/clarity/star-line";
const variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    scale: 0,
  },
};
const MaximizeDoc = ({
  maximizeOrNot,
  setMaximizeOrNot,
  imageData,
  setImageData,
  showHeaderFooter,
  setShowHeaderFooter,
  fieldLength,
  setCurrentDeletingDocId,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const crud = useSelector((state) => state.crud);
  const user = useSelector((state) => state.user.user);
  const searchResultArray = useSelector(
    (state) => state.searchResults.searchResults
  );

  //   const [showHeaderFooter, setShowHeaderFooter] = useState(false);
  const [docEditMode, setDocEditMode] = useState(false);
  const [oldDocData, setOldDocData] = useState();
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const loadState = useSelector((state) => state.loading);
  const { itemId, place, isLoading, process, success } = loadState;

  //HANDLER_____FUNCTIONS___________________//

  const handleImageClick = () => {
    // console.log(fieldLength);
    if (location.pathname === "/favorites/favoritesDocs" && fieldLength <= 0) {
      //   console.log("img clicked", showHeaderFooter);
      return;
    }
    setShowHeaderFooter(!showHeaderFooter);
  };
  const handleEditButtonClicked = () => {
    setDocEditMode(true);
  };

  const handleImageSave = () => {
    dispatch(
      editDoc(
        imageData._id,
        user._id,
        imageData,
        oldDocData,
        searchResultArray.length
      )
    );
    setDocEditMode(false);
  };
  const handleCancelBtnClicked = () => {
    setDocEditMode(false);
  };
  const minimizeImg = () => {
    setMaximizeOrNot(false);
    setDocEditMode(false);
    setShowHeaderFooter(false);
  };

  const handleDeleteClick = () => {
    setDeleteModalShow(!deleteModalShow);
  };
  const confirmDelete = () => {
    dispatch(
      deleteDoc(
        imageData.cloudinary_id,
        user._id,
        imageData._id,
        imageData.imageName,
        imageData
      )
    );
    setDeleteModalShow(!deleteModalShow);
    setMaximizeOrNot(false);
    setDocEditMode(false);
    setCurrentDeletingDocId(imageData._id);
  };
  useEffect(() => {
    // console.log(imageData);
    setOldDocData(imageData);
  }, [imageData]);

  const handleFavToggle = (docId, favValue) => {
    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }
    setImageData({
      ...imageData,
      isFavourite: isFav,
    });
    dispatch(docFavToggle(imageData._id, isFav));
  };

  return (
    <motion.div
      initial={false}
      variants={variants}
      transition={{ type: "tween", stiffness: 100, duration: 0.2 }}
      animate={maximizeOrNot ? "open" : "closed"}
      className={styles.maximizeImgWrapper}
    >
      {deleteModalShow === true ? (
        <div className={styles.modalContainer}>
          <div className={styles.dialogDiv}>
            <p>Are you sure you want to delete this item permanently ?</p>
          </div>
          <div className={styles.modalBtnDiv}>
            <div
              className={styles.modalCancelBtn}
              onClick={() => {
                setDeleteModalShow(!deleteModalShow);
              }}
            >
              <p>Cancel</p>
            </div>
            <div
              className={styles.modalConfirmBtn}
              onClick={() => {
                confirmDelete(imageData._id);
              }}
            >
              {isLoading === true &&
              place === "doc" &&
              itemId === imageData._id &&
              process === "delete" ? (
                <CircleSpinner size={12} color="white" loading={true} />
              ) : (
                <p>Sure, Delete ! </p>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.maximizeImgContainer}>
        {!showHeaderFooter && (
          <div className={styles.maxImgCloseBtnDiv} onClick={minimizeImg}>
            {/* <HiOutlineArrowNarrowLeft className={styles.minimizeIcon} /> */}
            <Icon
              icon="entypo:chevron-left"
              color="white"
              className={styles.minimizeIcon}
            />
          </div>
        )}
        {showHeaderFooter && (
          <div className={styles.docHeaderBtnWrapper}>
            <div className={styles.docHeaderBtnContainer}>
              {!docEditMode && (
                <div
                  className={styles.maxImgDeleteDiv}
                  onClick={() => {
                    handleDeleteClick();
                  }}
                >
                  <Icon icon="feather:trash" className={styles.deleteIcon} />
                </div>
              )}
              <div className={styles.maxImgFavBtnContainer}>
                <div
                  className={styles.maxImgFavBtnDiv}
                  onClick={() => {
                    handleFavToggle(imageData._id, imageData.isFavourite);
                  }}
                >
                  {imageData.isFavourite ? (
                    <BsBookmarkFill
                      className={styles.favIcon}
                      color="#00b7fd"
                    />
                  ) : (
                    <BsBookmarkPlus className={styles.favIcon} color="white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <img
          className={styles.maxImage}
          src={imageData.imageUrl ? imageData.imageUrl : null}
          onClick={handleImageClick}
        ></img>
        {showHeaderFooter && (
          <div className={styles.docTitleWrapper}>
            <div className={styles.docTitleContainer}>
              <div className={styles.docTitleDiv}>
                {!docEditMode ? (
                  <p className={styles.maxImgTitleText}>
                    {imageData.imageName}
                  </p>
                ) : (
                  <input
                    className={styles.maxImgTitleInput}
                    value={imageData.imageName}
                    onChange={(e) =>
                      setImageData({
                        ...imageData,
                        imageName: e.target.value,
                      })
                    }
                  ></input>
                )}
              </div>

              <div className={styles.docEditBtnContainer}>
                {!docEditMode ? (
                  <div
                    className={styles.maxImgEditDiv}
                    onClick={handleEditButtonClicked}
                  >
                    <Icon
                      icon="akar-icons:pencil"
                      className={styles.pencilIcon}
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className={styles.maxImgSaveDiv}
                      onClick={handleImageSave}
                    >
                      <HiCheck className={styles.saveIcon} />
                    </div>
                    <div
                      className={styles.maxImgCancelDiv}
                      onClick={handleCancelBtnClicked}
                    >
                      <HiX className={styles.cancelIcon} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MaximizeDoc;
