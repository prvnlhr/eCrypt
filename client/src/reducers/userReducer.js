import {
  FETCH_USER,
  ADD_NEW_USER,
  REMOVE_USER,
  UPDATE_USER_PROFILE,
} from "../actions/types";
import store from "../store/index";

const initialState = {
  user: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_USER:
      return {
        ...state,
        user: action.user,
      };

    case REMOVE_USER:
      return {
        ...state,
        user: [],
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
