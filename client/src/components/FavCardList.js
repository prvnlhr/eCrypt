import React from "react";
import listStyles from "../css/favList.module.css";
import FavouriteCard from "./FavouriteCard";
import noContentStyles from "../css/noContentMessage.module.css";
import { FiPlusCircle } from "react-icons/fi";

const FavCardList = ({ favoritesCardsArray }) => {
  return (
    <div className={listStyles.favList}>
      {favoritesCardsArray.length < 1 ? (
        <div className={noContentStyles.messageContainer}>
          <p>No Favourite Cards</p>
        </div>
      ) : null}

      {favoritesCardsArray.map((favItem) => (
        <FavouriteCard favItem={favItem} />
      ))}
    </div>
  );
};

export default FavCardList;
