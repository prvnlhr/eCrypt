import React from "react";
import styles from "../css/searchList.module.css";
import SearchItem from "./SearchItem";
const SearchList = ({ searchResultArray, setImageData, setMaximizeOrNot }) => {
  return (
    <div className={styles.searchList}>
      {searchResultArray.map((item) => (
        <>
          <SearchItem
            item={item}
            setImageData={setImageData}
            setMaximizeOrNot={setMaximizeOrNot}
          />
        </>
      ))}
    </div>
  );
};

export default SearchList;
