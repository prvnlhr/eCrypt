import React from "react";
import listStyles from "../css/favList.module.css";
import FavouriteCard from "./FavouriteCard";

const FavCardList = ({ favoritesCardsArray }) => {
  return (
    <div className={listStyles.favList}>
      {favoritesCardsArray.map((favItem) => (
        <FavouriteCard favItem={favItem} />
      ))}
    </div>
  );
};

export default FavCardList;
