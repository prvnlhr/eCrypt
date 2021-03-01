import React from "react";
import listStyles from "../css/favList.module.css";
import FavouriteLoginId from "./FavouriteLoginId";

const FavLoginList = ({ favoritesLoginsArray }) => {
  return (
    <div className={listStyles.favList}>
      {favoritesLoginsArray.map((favItem) => (
        <FavouriteLoginId favItem={favItem} />
      ))}
    </div>
  );
};

export default FavLoginList;
