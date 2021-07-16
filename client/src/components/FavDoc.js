import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { docFavToggle } from "../actions/documentsAction";
import styles from "../css/document.module.css";
import favStyles from "../css/favouriteItem.module.css";
import { HiStar, HiOutlineStar } from "react-icons/hi";

const FavDoc = ({ favItem }) => {
  const dispatch = useDispatch();
  const [maximize, setEnlarge] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleFavToggle = (docId, favValue) => {
    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }

    dispatch(docFavToggle(docId, isFav));
  };
  const maximizeImg = (docId) => {
    setEditId(favItem._id);
    setEnlarge(!maximize);
  };

  return (
    <div
      className={
        editId === favItem._id && maximize === true
          ? favStyles.maximize
          : styles.documentCard
      }
    >
      <div
        className={
          editId === favItem._id && maximize === true
            ? styles.imageContainerMaximize
            : styles.imageContainer
        }
      >
        <img
          className={
            editId === favItem._id && maximize === true
              ? styles.docImgMaximized
              : styles.docImg
          }
          src={favItem.imageUrl}
          onClick={maximizeImg}
        ></img>
      </div>

      {editId === favItem._id && maximize === true ? null : (
        <div className={styles.imageTitleContainer}>
          <div className={styles.titleDiv}>
            <p className={styles.titleText}>{favItem.imageName}</p>
          </div>

          {editId === favItem._id && maximize === true ? null : (
            <div className={styles.buttonContainer}>
              <div className={styles.favBtnDiv}>
                <div
                  className={styles.favBtn}
                  onClick={() => {
                    handleFavToggle(favItem._id, favItem.isFavourite);
                  }}
                >
                  {favItem.isFavourite ? (
                    <HiStar className={styles.favIcon} color="#4CD7F6" />
                  ) : (
                    <HiOutlineStar className={styles.favIcon} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavDoc;
