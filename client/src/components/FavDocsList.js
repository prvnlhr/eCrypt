import React from "react";
import { useState, useEffect, useRef } from "react";

import FavDoc from "./FavDoc";
import listStyles from "../css/favList.module.css";
import noContentStyles from "../css/noContentMessage.module.css";
import { FiPlusCircle } from "react-icons/fi";

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
