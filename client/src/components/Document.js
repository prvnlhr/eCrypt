import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../css/document.module.css";
import modalStyles from "../css/modal.module.css";
import LazyLoad from "react-lazy-load";

import { deleteDoc, editDoc, docFavToggle } from "../actions/documentsAction";
import { CircleSpinner } from "react-spinners-kit";
import { motion } from "framer-motion";

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
  const crud = useSelector((state) => state.crud);

  const [maximize, setEnlarge] = useState(false);
  const [editId, setEditId] = useState(null);
  const [inEditMode, setInEditMode] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [thisDocRefIndex, setThisDocRefIndex] = useState(null);
  const node = useRef();
  const [currDocData, setCurrDocData] = useState();
  const [oldDocData, setOldDocData] = useState();
  // const loading = useSelector((state) => state.process);

  // const { category, inProcess, status, process } = loading;
  const loadState = useSelector((state) => state.loading);
  const { itemId, place, isLoading, process, success } = loadState;

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
    console.log(doc);
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
    console.log(oldDocData)
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

        <div className={styles.favBtnDiv}>
          <div
            className={styles.favBtn}
            onClick={() => {
              handleFavToggle(doc._id);
            }}
          >
            {(currDocData ? currDocData.isFavourite : doc.isFavourite) ? (
              <BsBookmarkFill className={styles.favIcon} color="#00b7fd" />
            ) : (
              <BsBookmarkPlus className={styles.favIcon} color="gray" />
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

// export default React.forwardRef(Document);
export default Document;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//_____________________________________-
{
  /* <div className={styles.buttonContainer}>
        <div className={styles.dotMenuDiv}>
          {btnExpandId === doc._id && btnExpand ? (
            <HiChevronRight
              className={styles.chevronIcon}
              onClick={() => {
                setBtnExpandId(null);
                setBtnExpand(false);
              }}
            />
          ) : (
            <>
              {crud.inProcess ? (
                <CircleSpinner size={12} color="white" loading={true} />
              ) : (
                <HiChevronLeft
                  className={styles.chevronIcon}
                  onClick={() => {
                    setBtnExpandId(doc._id);
                    setBtnExpand(true);
                  }}
                />
              )}
            </>
          )}
        </div>

 


        {btnExpandId === doc._id && btnExpand && (
          <div className={styles.editDeleteBtnDiv}>
            {inEditMode ? (
              <>
                <div className={styles.saveBtnDiv}>
                  <HiCheck
                    color="#9baece"
                    className={styles.saveIcon}
                    onClick={() => {
                      save(doc._id);
                      setEditId(null);
                      setInEditMode(!inEditMode);
                      setEditButton(true);
                    }}
                  />
                </div>
                <div className={styles.cancelBtnDiv}>
                  <HiX
                    color="#9baece"
                    className={styles.cancelIcon}
                    onClick={() => {
                      setEditId(null);
                      setInEditMode(!inEditMode);
                      setEditButton(true);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                {showEditButton && inEditMode === false ? (
                  <>
                    <div className={styles.editBtnDiv}>
                      <Icon
                        icon={pencilIcon}
                        color="#9baece"
                        className={styles.editIcon}
                        onClick={() => {
                          setEditButton(null);
                          setEditId(doc._id);
                          setInEditMode(!inEditMode);
                        }}
                      />
                    </div>

                    <div
                      className={styles.deleteBtnDiv}
                      onClick={() => {
                        handleDeleteClick();
                      }}
                    >
                      {crud.inProcess &&
                      crud.itemId === doc._id &&
                      crud.operation === "delete" ? (
                        <CircleSpinner size={10} color="gray" loading={true} />
                      ) : (
                        <Icon
                          icon={trashSimpleBold}
                          className={styles.deleteIcon}
                          color="#f9aeb5"
                        />
                      )}
                    </div>
                  </>
                ) : null}
              </>
            )}
          </div>
        )}
      </div> */
}

{
  /* {editId === doc._id && maximize === true ? null : (
        <div className={styles.imageTitleContainer}>
        
          
        </div>
      )} */
}

// ________________________________________
{
  /* <div className={styles.titleDiv}>
            {inEditMode ? (
              <input
                className={styles.titleInput}
                value={title.imageName}
                onChange={(e) =>
                  setTitle({ ...title, imageName: e.target.value })
                }
              ></input>
            ) : (
              <p className={styles.titleText}>{doc.imageName}</p>
            )}
          </div> */
}

{
  /* <div className={styles.titleBtnDiv}>
            {inEditMode ? (
              <>
                <div className={styles.saveBtnDiv}>
                  <HiCheck
                    className={styles.saveBtn}
                    onClick={() => {
                      save(doc._id);
                      setEditId(null);
                      setInEditMode(!inEditMode);
                      setEditButton(true);
                    }}
                  />
                </div>
                <div className={styles.cancelBtnDiv}>
                  <HiX
                    className={styles.cancelBtn}
                    onClick={() => {
                      setEditId(null);
                      setInEditMode(!inEditMode);
                      setEditButton(true);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                {showEditButton && inEditMode === false ? (
                  <div className={styles.editBtnDiv}>
                    <HiOutlinePencil
                      className={styles.editBtn}
                      onClick={() => {
                        setEditButton(null);
                        setEditId(doc._id);
                        setInEditMode(!inEditMode);
                      }}
                    />
                  </div>
                ) : null}
              </>
            )}
          </div> */
}
// ________________

{
  /* { editId === doc._id && maximize === true ? null : (
        <div className={styles.buttonContainer}>
          {maximize === true && editId === doc._id ? (
            <div className={styles.minimizeBtn} onClick={minimizeImg}></div>
          ) : (
            <div className={styles.minimizeBtn} onClick={maximizeImg}></div>
          )}
          <div
            className={styles.imageDeleteDiv}
            //  onClick={handleDelete}
            onClick={() => {
              handleDeleteClick();
            }}
          >
            {crud.inProcess &&
            crud.itemId === doc._id &&
            crud.operation === "delete" ? (
              <CircleSpinner size={10} color="gray" loading={true} />
            ) : (
              <CgTrashEmpty />
            )}
          </div>
          <div className={styles.titleBtnDiv}>
            {inEditMode ? (
              <>
                <div className={styles.saveBtnDiv}>
                  <HiCheck
                    className={styles.saveBtn}
                    onClick={() => {
                      save(doc._id);
                      setEditId(null);
                      setInEditMode(!inEditMode);
                      setEditButton(true);
                    }}
                  />
                </div>
                <div className={styles.cancelBtnDiv}>
                  <HiX
                    className={styles.cancelBtn}
                    onClick={() => {
                      setEditId(null);
                      setInEditMode(!inEditMode);
                      setEditButton(true);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                {showEditButton && inEditMode === false ? (
                  <div className={styles.editBtnDiv}>
                    <HiOutlinePencil
                      className={styles.editBtn}
                      onClick={() => {
                        setEditButton(null);
                        setEditId(doc._id);
                        setInEditMode(!inEditMode);
                      }}
                    />
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div className={styles.bookmarkDiv}>
            <div
              className={styles.favBtn}
              onClick={() => {
                handleFavToggle(doc._id, doc.isFavourite);
              }}
            >
              {doc.isFavourite ? (
                <HiStar
                  className={styles.favIcon}
                  fontSize="18px"
                  color="#2f89fc"
                />
              ) : (
                <HiOutlineStar className={styles.favIcon} fontSize="16px" />
              )}
            </div>
          </div>
        </div>
      )} */
}
