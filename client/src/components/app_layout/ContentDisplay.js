import React from "react";
import { useState, useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { fetchUserCards } from "../../actions/cardsAction";
import { fetchLoginIds } from "../../actions/loginInIdsAction";
import { fetchDocs } from "../../actions/documentsAction";
import { fetchActivity } from "../../actions/activityAction";
// import LoginIdsList from "../loginIds/LoginIdsList";
// import CardsList from "../card/CardsList";
// import Dashboard from "./Dashboard";
// import Settings from "./Settings";
// import DocsList from "../document/DocsList";
// import FavList from "../favourite/FavList";
import styles from "../../css/app_layout/contentDisplay.module.css";
import SearchList from "../search/SearchList";
import { CircleSpinner } from "react-spinners-kit";

const FavList = lazy(() => import("../favourite/FavList"));
const CardsList = lazy(() => import("../card/CardsList"));
const Dashboard = lazy(() => import("./Dashboard"));
const Settings = lazy(() => import("./Settings"));
const LoginIdsList = lazy(() => import("../loginIds/LoginIdsList"));
const DocsList = lazy(() => import("../document/DocsList"));

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
  currDeletingDocId,
}) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.user._id);

  const [currentId, setCurrentId] = useState(null);

  // useEffect(() => {

  // }, [token, dispatch]);
  useEffect(() => {
    if (userId) {
      dispatch(fetchActivity(userId));
      dispatch(fetchUserCards(userId));
      dispatch(fetchLoginIds(userId));
      dispatch(fetchDocs(userId));
      // console.log("hello");
    }
  }, [currentId, dispatch, userId]);

  useEffect(() => {
    // console.log(fieldLength);
  }, [fieldLength]);

  const loginIdsArray = useSelector((state) => state.logins.loginIds);
  const cardsArray = useSelector((state) => state.cards.cards);
  const docsArray = useSelector((state) => state.docs.docs);
  const activitiesArray = useSelector((state) => state.activities);

  const favoritesLoginsArray = useSelector(
    (state) => state.favorites.favoriteLoginsIds
  );
  const favoritesCardsArray = useSelector(
    (state) => state.favorites.favoriteCards
  );

  const favoritesDocsArray = useSelector(
    (state) => state.favorites.favoriteDocs
  );
  const searchResultArray = useSelector(
    (state) => state.searchResults.searchResults
  );

  // console.log(activitiesArray);
  return (
    <div className={styles.contentDisplay}>
        {/* <div className={styles.lazySuspenseFallBackDiv}>
            <CircleSpinner size={12} color="gray" loading={true} />
          </div> */}
      {searchResultArray.length > 0 && fieldLength > 0 ? (
        <SearchList
          searchResultArray={searchResultArray}
          setHeading={setHeading}
          imageData={imageData}
          setImageData={setImageData}
          maximizeOrNot={maximizeOrNot}
          setMaximizeOrNot={setMaximizeOrNot}
          showHeaderFooter={showHeaderFooter}
          setShowHeaderFooter={setShowHeaderFooter}
 
        />
      ) : null}

      <Suspense
        fallback={
          <div className={styles.lazySuspenseFallBackDiv}>
            <CircleSpinner size={12} color="gray" loading={true} />
          </div>
        }
      >
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
                currDeletingDocId={currDeletingDocId}
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
      </Suspense>
    </div>
  );
};

export default ContentDisplay;
