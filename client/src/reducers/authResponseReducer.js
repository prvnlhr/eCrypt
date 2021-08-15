import {
  RESPONSE_SUCCESS,
  RESPONSE_ERROR,
  RESPONSE_CLEAR,
} from "../actions/types";

const initialAuthState = {
  at: undefined,
  success: undefined,
  error: undefined,
};

const token = (state = initialAuthState, action) => {
  switch (action.type) {
    case RESPONSE_SUCCESS:
      return {
        ...state,
        at: action.at,
        success: action.success,
        error: undefined,
      };
    case RESPONSE_ERROR:
      return {
        ...state,
        at: action.at,
        success: undefined,
        error: action.error,
      };
    case RESPONSE_CLEAR:
      return {
        ...state,
        at: undefined,
        success: undefined,
        error: undefined,
      };

    default:
      return state;
  }
};
export default token;
