import React from "react";

import FavDoc from "./FavDoc";
import listStyles from "../css/favList.module.css";

const FavDocsList = ({ favoritesDocsArray }) => {
  return (
    <div className={listStyles.favList}>
      {favoritesDocsArray.map((favItem) => (
        <>
          <FavDoc favItem={favItem} />
        </>
      ))}
    </div>
  );
};

export default FavDocsList;
