import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Route, NavLink, useHistory } from "react-router-dom";
import { fetchFavorites } from "../../actions/favouriteAction";

import FavCardList from "./FavCardList";
import FavLoginList from "./FavLoginList";
import FavDocsList from "./FavDocsList";
import styles from "../../css/favourite/favList.module.css";

const FavList = ({
  favoritesCardsArray,
  favoritesDocsArray,
  favoritesLoginsArray,
  setHeading,
  maxImg,
  setMaxImg,
  setImageData,
  setMaximizeOrNot,
}) => {
  const userId = useSelector((state) => state.user.user._id);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   history.push({
  //     pathname: "/favorites/favoritesLogins",
  //   });
  // }, []);

  useEffect(() => {
    setHeading("Favorites");
    // <Redirect to={{pathname: "/favorites/favoritesLogins"}} />;

    dispatch(fetchFavorites(userId));
  }, [dispatch, userId]);
  return (
    <div className={styles.favListComponent}>
      <div className={styles.navHeaderContainer}>
        <NavLink
          activeStyle={{
            backgroundColor: "#00b7fd",
            color: "white",
            borderRadius: "20px",
            width: "100px",
          }}
          className={styles.navLink}
          to="/favorites/favoritesLogins"
          style={{ borderRadius: "20px" }}
        >
          Logins
        </NavLink>
        <NavLink
          activeStyle={{
            backgroundColor: "#00b7fd",
            color: "white",
            width: "100px",
          }}
          className={styles.navLink}
          to="/favorites/favoritesCards"
        >
          Cards
        </NavLink>
        <NavLink
          activeStyle={{
            backgroundColor: "#00b7fd",
            color: "white",
            width: "110px",
          }}
          className={styles.navLink}
          to="/favorites/favoritesDocs"
        >
          Documents
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
          <FavDocsList
            favoritesDocsArray={favoritesDocsArray}
            setImageData={setImageData}
            setMaximizeOrNot={setMaximizeOrNot}
          />
        </Route>
      </div>
    </div>
  );
};

export default FavList;
