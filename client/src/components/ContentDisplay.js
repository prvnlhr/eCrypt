import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { fetchUserCards } from "../actions/cardsAction";
import { fetchLoginIds } from "../actions/loginInIdsAction";
import { fetchDocs } from "../actions/documentsAction";
import { fetchActivity } from "../actions/activityAction";
import LoginIdsList from "./LoginIdsList";
import CardsList from "./CardsList";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import styles from "../css/contentDisplay.module.css";
import DocsList from "./DocsList";
import FavList from "./FavList";
import SearchList from "./SearchList";
const ContentDisplay = ({
  heading,
  setHeading,
  fieldLength,
  setFieldLength,
  imageData,
  setImageData,
  maximizeOrNot,
  setMaximizeOrNot,
  showHeaderFooter,
  setShowHeaderFooter,
}) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.user._id);

  const [currentId, setCurrentId] = useState(null);
  const token = useSelector((state) => state.token.token);

  // useEffect(() => {

  // }, [token, dispatch]);
  useEffect(() => {
    if (userId) {
      dispatch(fetchActivity(userId));
      dispatch(fetchUserCards(userId));
      dispatch(fetchLoginIds(userId));
      dispatch(fetchDocs(userId));
    }
  }, [currentId, dispatch, userId]);

  useEffect(() => {
    console.log(fieldLength);
  }, [fieldLength]);

  const loginIdsArray = useSelector((state) => state.logins.loginIds);
  const cardsArray = useSelector((state) => state.cards.cards);
  const docsArray = useSelector((state) => state.docs.docs);
  const activitiesArray = useSelector((state) => state.activities.activities);

  const favoritesLoginsArray = useSelector(
    (state) => state.favorites.favoriteLoginsIds
  );
  const favoritesCardsArray = useSelector(
    (state) => state.favorites.favoriteCards
  );

  const favoritesDocsArray = useSelector(
    (state) => state.favorites.favoriteDocs
  );
  const searchResultArray = useSelector((state) => state.search.searchResults);

  return (
    <div className={styles.contentDisplay}>
      {searchResultArray.length > 0 && fieldLength > 0 ? (
        <SearchList
          searchResultArray={searchResultArray}
          setHeading={setHeading}
          setImageData={setImageData}
          setMaximizeOrNot={setMaximizeOrNot}
          // maxImg={maxImg}
          // setMaxImg={setMaxImg}
        />
      ) : null}

      <Switch>
        <Route
          exact
          path="/displayCards"
          render={(props) => (
            <CardsList
              {...props}
              cards={cardsArray}
              currentId={currentId}
              setCurrentId={setCurrentId}
              setHeading={setHeading}
            />
          )}
        />
        <Route
          exact
          path="/displayLogins"
          render={(props) => (
            <LoginIdsList
              {...props}
              loginIds={loginIdsArray}
              currentId={currentId}
              setCurrentId={setCurrentId}
              setHeading={setHeading}
            />
          )}
        />
        <Route
          path="/documents"
          render={(props) => (
            <DocsList
              {...props}
              docs={docsArray}
              setHeading={setHeading}
              imageData={imageData}
              setImageData={setImageData}
              maximizeOrNot={maximizeOrNot}
              setMaximizeOrNot={setMaximizeOrNot}
              showHeaderFooter={showHeaderFooter}
              setShowHeaderFooter={setShowHeaderFooter}
            />
          )}
        />

        <Route
          path="/settings"
          render={(props) => <Settings {...props} setHeading={setHeading} />}
        />

        <Route
          path="/favorites"
          render={(props) => (
            <FavList
              {...props}
              setHeading={setHeading}
              favoritesCardsArray={favoritesCardsArray}
              favoritesDocsArray={favoritesDocsArray}
              favoritesLoginsArray={favoritesLoginsArray}
              setImageData={setImageData}
              setMaximizeOrNot={setMaximizeOrNot}
              // maxImg={maxImg}
              // setMaxImg={setMaxImg}
            />
          )}
        />

        <Route
          path="/"
          render={(props) => (
            <Dashboard
              {...props}
              setHeading={setHeading}
              activities={activitiesArray}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default ContentDisplay;
