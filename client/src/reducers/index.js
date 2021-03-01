import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cardsReducer from "./cardsReducer";
import loginIdsReducer from "./loginIdsReducer";
import favoritesReducer from "./favoritesReducer";
import docsReducer from "./docsReducer";
import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";
import tokenReducer from "./tokenReducer";
import notificationReducer from "./notificationReducer";
import searchReducer from "./searchReducer";
import activityReducer from "./activityReducer";
export default combineReducers({
  cards: cardsReducer,
  user: userReducer,
  auth: authReducer,
  logins: loginIdsReducer,
  favorites: favoritesReducer,
  docs: docsReducer,
  loading: loadingReducer,
  auth: authReducer,
  token: tokenReducer,
  notification: notificationReducer,
  search: searchReducer,
  activities: activityReducer,
});
