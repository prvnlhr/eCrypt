import React from "react";

import FavDoc from "./FavDoc";
import listStyles from "../css/favList.module.css";
import noContentStyles from "../css/noContentMessage.module.css";
import { FiPlusCircle } from "react-icons/fi";

const FavDocsList = ({ favoritesDocsArray }) => {
  return (
    <div className={listStyles.favList}>
      {favoritesDocsArray.length < 1 ? (
        <div className={noContentStyles.messageContainer}>
          <p>No Favourite Documents</p>
        </div>
      ) : null}
      {favoritesDocsArray.map((favItem) => (
        <>
          <FavDoc favItem={favItem} />
        </>
      ))}
    </div>
  );
};

export default FavDocsList;
