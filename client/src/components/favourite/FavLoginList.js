import React from "react";
import listStyles from "../../css/favourite/favList.module.css";
import FavouriteLoginId from "./FavouriteLoginId";
import noContentStyles from "../../css/document/noContentMessage.module.css";

const FavLoginList = ({ favoritesLoginsArray }) => {
  return (
    <div className={listStyles.favList}>
      {favoritesLoginsArray.length < 1 ? (
        <div className={noContentStyles.messageContainer}>
          <p>No Favourite Logins</p>
        </div>
      ) : null}
      {favoritesLoginsArray.map((favItem) => (
        <FavouriteLoginId favItem={favItem} />
      ))}
    </div>
  );
};

export default FavLoginList;
