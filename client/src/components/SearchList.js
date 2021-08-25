import React from "react";
import styles from "../css/searchList.module.css";
import { useState, useEffect } from "react";

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
    <div className={styles.searchList}>
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
  );
};

export default SearchList;
