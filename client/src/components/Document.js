import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../css/document.module.css";
import modalStyles from "../css/modal.module.css";

import { deleteDoc, editDoc, docFavToggle } from "../actions/documentsAction";
import { CgTrashEmpty } from "react-icons/cg";
import { CircleSpinner } from "react-spinners-kit";
import { IoMdTrash } from "react-icons/io";
import { HiPencil, HiStar, HiOutlineStar, HiCheck, HiX } from "react-icons/hi";
import { Icon, InlineIcon } from "@iconify/react";

//new icons set__________________________________
import pencilIcon from "@iconify-icons/akar-icons/pencil";
import bookmarkStarFill from "@iconify-icons/bi/bookmark-star-fill";
import bookmarkStar from "@iconify-icons/bi/bookmark-star";
import circleXFill from "@iconify-icons/akar-icons/circle-x-fill";
import circleCheckFill from "@iconify-icons/akar-icons/circle-check-fill";
import checkIcon from "@iconify-icons/bi/check";
import xLg from "@iconify-icons/bi/x-lg";
import trashEmpty from "@iconify-icons/gg/trash-empty";

// ______________________________________________________
const Document = ({
  doc,
  showEditButton,
  setEditButton,
  maxImg,
  setMaxImg,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  const crud = useSelector((state) => state.crud);

  const [maximize, setEnlarge] = useState(false);
  const [editId, setEditId] = useState(null);
  const [inEditMode, setInEditMode] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [title, setTitle] = useState({
    imageName: "",
  });

  const docDataToEdit = useSelector((state) =>
    editId ? state.docs.docs.find((d) => d._id === editId) : null
  );

  useEffect(() => {
    if (docDataToEdit) {
      setTitle(docDataToEdit);
    }
  }, [docDataToEdit]);

  const handleFavToggle = (docId, favValue) => {
    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }

    dispatch(docFavToggle(docId, isFav));
  };

  const save = (id) => {
    dispatch(editDoc(id, userId, title));
  };
  const handleMaximize = (docId) => {
    // setEditId(doc._id);
    // setEnlarge(!maximize);
    setMaxImg(doc.imageUrl);
  };
  const minimizeImg = () => {
    setEditId(null);
    setEnlarge(!maximize);
  };
  const confirmDelete = () => {
    dispatch(deleteDoc(doc.cloudinary_id, userId, doc._id, doc.imageName));
    setModalShow(!modalShow);
  };
  const handleDeleteClick = () => {
    setModalShow(!modalShow);
  };

  // const handleDelete = () => {
  //   //NOTE: we are passing doc title parameter to action to add to activity
  //   dispatch(deleteDoc(doc.cloudinary_id, userId, doc._id, doc.imageName));
  // };

  return (
    <div className={styles.documentCard}>
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
              {crud.inProcess ? (
                <CircleSpinner size={12} color="white" loading={true} />
              ) : (
                <p>Sure, Delete ! </p>
              )}
            </div>
          </div>
        </div>
      ) : null}


      <div className={styles.buttonContainer}>
        <div className={styles.editBtnWrapper}>
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
              ) : null}
            </>
          )}
        </div>
        <div
          className={styles.imageDeleteBtnDiv}
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
              icon={trashEmpty}
              className={styles.deleteIcon}
              color="#9baece"
            />
          )}
        </div>
        <div className={styles.favBtnDiv}>
          <div
            className={styles.favBtn}
            onClick={() => {
              handleFavToggle(doc._id, doc.isFavourite);
            }}
          >
            {doc.isFavourite ? (
              <Icon
                icon={bookmarkStarFill}
                className={styles.favIcon}
                color="#00b7fd"
              />
            ) : (
              <Icon
                className={styles.favIcon}
                icon={bookmarkStar}
                color="#9baece"
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <img src={doc.imageUrl} onClick={handleMaximize}></img>
      </div>

      <div className={styles.titleDiv}>
        {inEditMode ? (
          <input
            className={styles.titleInput}
            value={title.imageName}
            onChange={(e) => setTitle({ ...title, imageName: e.target.value })}
          ></input>
        ) : (
          <p className={styles.titleText}>{doc.imageName}</p>
        )}
      </div>
    </div>
  );
};

export default Document;

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
