import { TOKEN_SUCCESS, TOKEN_FAILURE, TOKEN_REMOVE } from "../actions/types";

const initialAuthState = {
  token: "",
  error: "",
};

const token = (state = initialAuthState, action) => {
  switch (action.type) {
    case TOKEN_SUCCESS:
      console.log(action.token);
      return {
        ...state,
        error: "",
        token: action.token,
      };
    case TOKEN_REMOVE:
      return {
        ...state,
        error: "",
        token: "",
      };
    case TOKEN_FAILURE:
      return {
        ...state,
        token: "",
        error: action.failureMsg,
      };

    default:
      return state;
  }
};
export default token;
