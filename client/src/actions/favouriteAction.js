import * as api from "../api";

import {
  ADD_TO_FAVOURITE_CARDS,
  ADD_TO_FAVOURITE_LOGINS,
  ADD_TO_FAVOURITE_DOCS,
} from "./types";

export const fetchFavorites = (user_id) => async (dispatch) => {
  try {
    const response = await api.fetchFavorites(user_id);
    const favCards = response.data[0].cardsArray;
    const favLoginIds = response.data[0].loginIdsArray;
    const favDocs = response.data[0].docsArray;
    dispatch({
      type: ADD_TO_FAVOURITE_CARDS,
      payload: favCards,
    });
    dispatch({
      type: ADD_TO_FAVOURITE_LOGINS,
      payload: favLoginIds,
    });
    dispatch({
      type: ADD_TO_FAVOURITE_DOCS,
      payload: favDocs,
    });
  } catch (error) {
  }
};
