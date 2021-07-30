import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { docFavToggle } from "../actions/documentsAction";
import styles from "../css/document.module.css";
import favStyles from "../css/favouriteItem.module.css";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import { Icon, InlineIcon } from "@iconify/react";
import bookmarkFill from "@iconify-icons/bi/bookmark-fill";
import bookmarkStarFill from "@iconify-icons/bi/bookmark-star-fill";
import bookmarkStar from "@iconify-icons/bi/bookmark-star";
const FavDoc = ({ favItem, maxImg, setMaxImg }) => {
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
  const handleMaximize = () => {
    setMaxImg(favItem.imageUrl);
  };
  return (
    <div className={styles.documentCard}>
      <div className={styles.buttonContainer}>
        <div className={styles.favBtnDiv}>
          <div
            className={styles.favBtn}
            onClick={() => {
              handleFavToggle(favItem._id, favItem.isFavourite);
            }}
          >
            {favItem.isFavourite ? (
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
        <img src={favItem.imageUrl} onClick={handleMaximize}></img>
      </div>
      <div className={styles.titleDiv}>
        <p className={styles.titleText}>{favItem.imageName}</p>
      </div>
    </div>
  );
};

export default FavDoc;
