import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css/document/document.module.css";
import modalStyles from "../../css/modal/modal.module.css";
import LazyLoad from "react-lazy-load";

import {
  deleteDoc,
  editDoc,
  docFavToggle,
} from "../../actions/documentsAction";
import { CircleSpinner } from "react-spinners-kit";
import { motion } from "framer-motion";
import TrashIcon from "../icons/TrashIcon";
import BookmarkPlus from "../icons/BookmarkPlus";
import BookmarkFill from "../icons/BookmarkFill";
import PencilIcon from "../icons/PencilIcon";

// icons set__________________________________
import { Icon, InlineIcon } from "@iconify/react";

import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";

// ______________________________________________________
const Document = ({
  doc,
  showEditButton,
  setEditButton,
  btnExpandId,
  setBtnExpandId,
  setBtnExpand,
  btnExpand,
  imageData,
  setImageData,
  maximizeOrNot,
  setMaximizeOrNot,
  showHeaderFooter,
  setShowHeaderFooter,
  currDeletingDocId,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);

  const [editId, setEditId] = useState(null);
  const [inEditMode, setInEditMode] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [currDocData, setCurrDocData] = useState();
  const [oldDocData, setOldDocData] = useState();
  // const loading = useSelector((state) => state.process);

  // const { category, inProcess, status, process } = loading;
  const loadState = useSelector((state) => state.loading);
  const { itemId, place, isLoading, process } = loadState;

  const dotBtnClicked = () => {
    setBtnExpand(!btnExpand);
  };
  const docDataToEdit = useSelector((state) =>
    editId ? state.docs.docs.find((d) => d._id === editId) : null
  );
  const docData = useSelector((state) =>
    state.docs.docs.find((d) => d._id === doc._id)
  );

  useEffect(() => {
    // console.log(doc);
    setCurrDocData(doc);
    setOldDocData(doc);
    // console.log(currDocData);
    // if (docDataToEdit) {
    //   setDocData(docDataToEdit);
    // }
  }, [doc]);

  const handleFavToggle = (docId) => {
    var favValue = currDocData.isFavourite;
    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }
    setCurrDocData({ ...currDocData, isFavourite: isFav });
    dispatch(docFavToggle(docId, isFav));
  };

  const save = (id) => {
    console.log(oldDocData);
    dispatch(editDoc(id, userId, currDocData, oldDocData));
  };
  const handleMaximize = () => {
    setImageData(docData);
    setShowHeaderFooter(true);
    setMaximizeOrNot(true);
    // console.log(docData);
  };

  const confirmDelete = () => {
    dispatch(deleteDoc(doc.cloudinary_id, userId, doc._id, doc.imageName));
    setModalShow(!modalShow);
  };
  const handleDeleteClick = () => {
    setBtnExpandId(null);
    setBtnExpand(false);
    setModalShow(!modalShow);
  };

  // const handleDelete = () => {
  //   //NOTE: we are passing doc title parameter to action to add to activity
  //   dispatch(deleteDoc(doc.cloudinary_id, userId, doc._id, doc.imageName));
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1],
      }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={styles.documentCard}
    >
      {modalShow === true ? (
        <div className={modalStyles.modalContainer}>
          <div className={modalStyles.dialogDiv}>
            <p>Are you sure you want to delete this item permanently ?</p>
          </div>
          <div className={modalStyles.modalBtnDiv}>
            <div
              className={modalStyles.modalCancelBtn}
              onClick={() => {
                setModalShow(!modalShow);
              }}
            >
              <p>Cancel</p>
            </div>
            <div
              className={modalStyles.modalConfirmBtn}
              onClick={() => {
                confirmDelete(doc._id);
              }}
            >
              {isLoading === true &&
              place === "doc" &&
              itemId === doc._id &&
              process === "delete" ? (
                <CircleSpinner size={12} color="white" loading={true} />
              ) : (
                <p>Sure, Delete ! </p>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.imageContainer}>
        {isLoading === true &&
          place === "doc" &&
          itemId === doc._id &&
          process === "delete" && (
            <div className={styles.spinnerDiv}>
              <CircleSpinner size={12} color="#0075ff" loading={true} />
            </div>
          )}

        <div className={styles.favBtnContainer}>
          <div
            className={styles.favBtnDiv}
            onClick={() => {
              handleFavToggle(doc._id);
            }}
          >
            {(currDocData ? currDocData.isFavourite : doc.isFavourite) ? (
                         // <BsBookmarkFill className={styles.favIcon} color="#00b7fd" />
            <BookmarkFill
            className={styles.favIcon}
            primaryColor={"#2882FF"}
            secondaryColor={"white"}
          />
            ) : (
             // <BsBookmarkPlus className={styles.favIcon} color="#9baece" />
             <BookmarkPlus
             className={styles.favIcon}
             primaryColor={"gray"}
             secondaryColor={"#2882FF"}
           />
            )}
          </div>
        </div>
        <LazyLoad offset={0}>
          <img onClick={handleMaximize} src={doc.imageUrl}></img>
        </LazyLoad>
      </div>

      <div className={styles.titleDiv}>
        {inEditMode ? (
          <input
            className={styles.titleInput}
            value={currDocData.imageName}
            onChange={(e) =>
              setCurrDocData({ ...currDocData, imageName: e.target.value })
            }
          ></input>
        ) : (
          <p className={styles.titleText}>{doc.imageName}</p>
        )}
      </div>
    </motion.div>
  );
};

export default Document;
