import React from "react";
import { useEffect } from "react";

import FavDoc from "./FavDoc";
import listStyles from "../../css/favourite/favList.module.css";
import noContentStyles from "../../css/document/noContentMessage.module.css";

const FavDocsList = ({
  favoritesDocsArray,
  setImageData,
  setMaximizeOrNot,
}) => {
  useEffect(() => {}, [favoritesDocsArray]);

  return (
    <div className={listStyles.favDocList}>
      {favoritesDocsArray.length < 1 ? (
        <div className={noContentStyles.messageContainer}>
          <p>No Favourite Documents</p>
        </div>
      ) : null}
      {favoritesDocsArray.map((favItem) => (
        <>
          <FavDoc
            favItem={favItem}
            setImageData={setImageData}
            setMaximizeOrNot={setMaximizeOrNot}
          />
        </>
      ))}
    </div>
  );
};

export default FavDocsList;
