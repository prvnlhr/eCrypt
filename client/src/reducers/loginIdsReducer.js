import {
  FETCH_LOGIN_IDS,
  ADD_NEW_LOGIN_ID,
  EDIT_LOGIN_ID,
  DELETE_LOGIN_ID,
  TOGGLE_LOGINS_IS_FAV,
} from "../actions/types";

const initialState = {
  loginIds: [],
};

export default function loginsIds(state = initialState, action) {
  switch (action.type) {
    //Delete
    case DELETE_LOGIN_ID:
      return {
        loginIds: action.payload,
      };
    //Fetching
    case FETCH_LOGIN_IDS:
      return {
        ...state,
        loginIds: action.payload,
      };
    //Adding new
    case ADD_NEW_LOGIN_ID:
      return {
        ...state,
        loginIds: [action.payload, ...state.loginIds],
      };
    //Editing
    case EDIT_LOGIN_ID:
      const newArray = state.loginIds.map((loginId) => {
        if (loginId._id === action.payload._id) {
          return action.payload;
        } else {
          return loginId;
        }
      });
      return {
        loginIds: newArray,
      };

    case TOGGLE_LOGINS_IS_FAV:
      const favVal = action.payload.favValue;
      const id = action.payload.id;
      const old = state.loginIds;
      const newLoginsArray = old.map((l) => {
        if (l._id === id) {
          return { ...l, isFavourite: favVal };
        } else {
          return l;
        }
      });
      return {
        ...state,
        loginIds: newLoginsArray,
      };

    // case DELETE_LOGIN_ID:
    //   return {
    //     ...state,
    //     loginIds: action.payload,
    //   };

    default:
      return state;
  }
}
