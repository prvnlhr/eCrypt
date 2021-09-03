import React from "react";
import styles from "../../css/search/searchList.module.css";
import { useState } from "react";
import SearchItem from "./SearchItem";
const SearchList = ({
  searchResultArray,
  setImageData,
  setMaximizeOrNot,
  setShowHeaderFooter,
}) => {
  const [showEditButton, setEditButton] = useState(true);
  const [currEditId, setCurrEditId] = useState(null);
  return (
    <>
      <div className={styles.searchList}>
        {/* <div className={styles.appBgDiv1}>
          <div className={styles.section1}></div>
          <div className={styles.section2}></div>
          <div className={styles.section3}></div>
        </div> */}

        {searchResultArray.map((item) => (
          <>
            <SearchItem
              item={item}
              setImageData={setImageData}
              setMaximizeOrNot={setMaximizeOrNot}
              currEditId={currEditId}
              setCurrEditId={setCurrEditId}
              showEditButton={showEditButton}
              setEditButton={setEditButton}
              setShowHeaderFooter={setShowHeaderFooter}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default SearchList;
