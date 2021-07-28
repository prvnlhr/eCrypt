import React from "react";
import styles from "../css/searchList.module.css";
import SearchItem from "./SearchItem";
const SearchList = ({ searchResultArray, maxImg, setMaxImg }) => {
  return (
    <div className={styles.searchList}>
      {searchResultArray.map((item) => (
        <>
          <SearchItem item={item} maxImg={maxImg} setMaxImg={setMaxImg} />
        </>
      ))}
    </div>
  );
};

export default SearchList;
