import React from "react";

import FavDoc from "./FavDoc";
import listStyles from "../css/favList.module.css";
import noContentStyles from "../css/noContentMessage.module.css";
import { FiPlusCircle } from "react-icons/fi";

const FavDocsList = ({ favoritesDocsArray, maxImg, setMaxImg }) => {
  return (
    <div className={listStyles.favDocList}>
      {favoritesDocsArray.length < 1 ? (
        <div className={noContentStyles.messageContainer}>
          <p>No Favourite Documents</p>
        </div>
      ) : null}
      {favoritesDocsArray.map((favItem) => (
        <>
          <FavDoc favItem={favItem} maxImg={maxImg} setMaxImg={setMaxImg} />
        </>
      ))}
    </div>
  );
};

export default FavDocsList;
