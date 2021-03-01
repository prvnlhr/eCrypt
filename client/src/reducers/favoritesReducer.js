import {
  ADD_TO_FAVOURITE_CARDS,
  REMOVE_FROM_FAVOURITE_CARDS,
  ADD_TO_FAVOURITE_LOGINS,
  REMOVE_FROM_FAVOURITE_LOGINS,
  ADD_TO_FAVOURITE_DOCS,
  REMOVE_FROM_FAVOURITE_DOCS,
} from "../actions/types";

const initialState = {
  favoriteLoginsIds: [],
  favoriteCards: [],
  favoriteDocs: [],
};

export default function favorites(state = initialState, action) {
  switch (action.type) {
    
    case ADD_TO_FAVOURITE_DOCS:
      return {
        ...state,
        favoriteDocs: action.payload,
      };


    case REMOVE_FROM_FAVOURITE_DOCS:
      return {
        ...state,
        favoriteDocs: action,
      };

    case ADD_TO_FAVOURITE_LOGINS:
      return {
        ...state,
        favoriteLoginsIds: action.payload,
      };

    case REMOVE_FROM_FAVOURITE_LOGINS:
      return {
        ...state,
        favoriteLoginsIds: action,
      };
    case ADD_TO_FAVOURITE_CARDS:
      return {
        ...state,
        favoriteCards: action.payload,
      };

    case REMOVE_FROM_FAVOURITE_CARDS:
      return {
        ...state,
        favoriteCards: action.payload,
      };

    default:
      return state;
  }
}
