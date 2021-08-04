import React from "react";
import { useState, useEffect, useRef } from "react";
import LazyLoad from "react-lazy-load";

import { useDispatch, useSelector } from "react-redux";
import { docFavToggle } from "../actions/documentsAction";
import styles from "../css/document.module.css";
import favStyles from "../css/favouriteItem.module.css";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import { Icon, InlineIcon } from "@iconify/react";
import bookmarkFill from "@iconify-icons/bi/bookmark-fill";
import bookmarkStarFill from "@iconify-icons/bi/bookmark-star-fill";
import bookmarkStar from "@iconify-icons/bi/bookmark-star";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";

const FavDoc = ({ favItem, setImageData, setMaximizeOrNot }) => {
  const dispatch = useDispatch();
  const docData = useSelector((state) =>
    favItem._id ? state.docs.docs.find((d) => d._id === favItem._id) : null
  );
  const [maximize, setEnlarge] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currDocData, setCurrDocData] = useState();

  useEffect(() => {
    setCurrDocData(favItem);
  }, [favItem]);

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

  const handleMaximize = () => {
    setImageData(docData);
    setMaximizeOrNot(true);
  };
  return (
    <div className={styles.documentCard}>
      <div className={styles.imageContainer}>
        <div className={styles.favBtnDiv}>
          <div
            className={styles.favBtn}
            onClick={() => {
              handleFavToggle(favItem._id, favItem.isFavourite);
            }}
          >
            {(currDocData ? currDocData.isFavourite : favItem.isFavourite) ? (
              <BsBookmarkFill className={styles.favIcon} color="#00b7fd" />
            ) : (
              <BsBookmarkPlus className={styles.favIcon} color="#9baece" />
            )}
          </div>
        </div>
        <LazyLoad offset={0}>
          <img src={favItem.imageUrl} onClick={handleMaximize}></img>
        </LazyLoad>
      </div>
      <div className={styles.titleDiv}>
        <p className={styles.titleText}>{favItem.imageName}</p>
      </div>
    </div>
  );
};

export default FavDoc;
