import React from "react";
import { useState, useEffect } from "react";
import LazyLoad from "react-lazy-load";

import { useDispatch, useSelector } from "react-redux";
import { docFavToggle } from "../../actions/documentsAction";
import styles from "../../css/document/document.module.css";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { motion } from "framer-motion";
import BookmarkPlus from "../icons/BookmarkPlus";
import BookmarkFill from "../icons/BookmarkFill";

const FavDoc = ({ favItem, setImageData, setMaximizeOrNot }) => {
  const dispatch = useDispatch();
  const docData = useSelector((state) =>
    favItem._id ? state.docs.docs.find((d) => d._id === favItem._id) : null
  );

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1],
      }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={styles.documentCard}
    >
      <div className={styles.imageContainer}>
        <div className={styles.favBtnContainer}>
          <div
            className={styles.favBtnDiv}
            onClick={() => {
              handleFavToggle(favItem._id, favItem.isFavourite);
            }}
          >
            {(currDocData ? currDocData.isFavourite : favItem.isFavourite) ? (
               <BookmarkFill
               className={styles.favIcon}
               primaryColor={"#2882FF"}
               secondaryColor={"white"}
             />
            ) : (
              <BookmarkPlus
              className={styles.favIcon}
              primaryColor={"#9baece"}
                 secondaryColor={"#2882FF"}
            />
            )}
          </div>
        </div>
        <LazyLoad offset={0}>
          <img src={favItem.imageUrl} onClick={handleMaximize} alt="doc"></img>
        </LazyLoad>
      </div>
      <div className={styles.titleDiv}>
        <p className={styles.titleText}>{favItem.imageName}</p>
      </div>
    </motion.div>
  );
};

export default FavDoc;
