import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
} from "../actions/types";

const initialAuthState = {
  error: "",
  success: "",
};

const notification = (state = initialAuthState, action) => {
  switch (action.type) {
    case SUCCESS_MESSAGE:
      return {
        ...state,
        error: "",
        success: action.message,
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        error: action.message,
        success: "",
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };

    case CLEAR_SUCCESS:
      return {
        ...state,
        success: "",
      };

    default:
      return state;
  }
};
export default notification;
