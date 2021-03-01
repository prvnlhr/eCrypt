import React from "react";
import styles from "../css/searchList.module.css";
import SearchItem from "./SearchItem";
const SearchList = ({ searchResultArray }) => {
  return (
    <div className={styles.searchList}>
      {searchResultArray.map((item) => (
        <>
          <SearchItem item={item} />
        </>
      ))}
    </div>
  );
};

export default SearchList;
