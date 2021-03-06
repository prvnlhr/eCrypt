import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {  Route, NavLink } from "react-router-dom";
import { fetchFavorites } from "../actions/favouriteAction";

import FavCardList from "./FavCardList";
import FavLoginList from "./FavLoginList";
import FavDocsList from "./FavDocsList";
import styles from "../css/favList.module.css";

const FavList = ({
  favoritesCardsArray,
  favoritesDocsArray,
  favoritesLoginsArray,
  setHeading,
}) => {
  const userId = useSelector((state) => state.user.user._id);

  const dispatch = useDispatch();

  useEffect(() => {
    setHeading("Favorites");

    dispatch(fetchFavorites(userId));
  }, [dispatch, userId]);
  return (
    <div className={styles.favListComponent}>
      <div className={styles.navHeaderContainer}>
        <NavLink
          activeStyle={{ backgroundColor: "#0177fb", color: "white" }}
          className={styles.navLink}
          to="/favorites/favoritesLogins"
        >
          <p>Logins</p>
        </NavLink>
        <NavLink
          activeStyle={{ backgroundColor: "#0177fb", color: "white" }}
          className={styles.navLink}
          to="/favorites/favoritesCards"
        >
          <p>Cards</p>
        </NavLink>
        <NavLink
          activeStyle={{ backgroundColor: "#0177fb", color: "white" }}
          className={styles.navLink}
          to="/favorites/favoritesDocs"
        >
          <p>Documents</p>
        </NavLink>
      </div>
      <div className={styles.contentContainer}>
        <Route path="/favorites/favoritesCards">
          <FavCardList favoritesCardsArray={favoritesCardsArray} />
        </Route>
        <Route exact path="/favorites/favoritesLogins">
          <FavLoginList favoritesLoginsArray={favoritesLoginsArray} />
        </Route>
        <Route path="/favorites/favoritesDocs">
          <FavDocsList favoritesDocsArray={favoritesDocsArray} />
        </Route>
      </div>
    </div>
  );
};

export default FavList;
