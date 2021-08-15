import {
  USER_LOGIN,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILURE,
  GET_USER,
  USER_LOGOUT,
  DESTROY_SESSION,
} from "../actions/types";

const initialAuthState = {
  isLogged: undefined,
};

const authNewReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogged: true,
      };

    case USER_LOGOUT:
      return {
        ...state,
        isLogged: false,
      };

    case DESTROY_SESSION:
      return {
        ...state,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default authNewReducer;
