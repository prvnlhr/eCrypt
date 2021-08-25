import React from "react";
import FavouriteCard from "./FavouriteCard";
import listStyles from "../../css/favourite/favList.module.css";
import noContentStyles from "../../css/document/noContentMessage.module.css";
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
