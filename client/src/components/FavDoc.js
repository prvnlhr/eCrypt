import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { docFavToggle } from "../actions/documentsAction";
import styles from "../css/document.module.css";
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
          ? styles.maximize
          : styles.documentCard
      }
    >
      <div className={styles.imageContainer}>
        <img src={favItem.imageUrl} onClick={maximizeImg}></img>
      </div>

      <div className={styles.imageTitleContainer}>
        <div className={styles.titleDiv}>
          <p className={styles.titleText}>{favItem.imageName}</p>
        </div>
      </div>
      <div className={styles.bookmarkDiv}>
        <div
          className={styles.favBtn}
          onClick={() => {
            handleFavToggle(favItem._id, favItem.isFavourite);
          }}
        >
          {favItem.isFavourite ? (
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
  );
};

export default FavDoc;
