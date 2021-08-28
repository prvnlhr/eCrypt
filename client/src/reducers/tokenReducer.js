import { TOKEN_SET } from "../actions/types";

const initialAuthState = {
  token: "",
};

const token = (state = initialAuthState, action) => {
  switch (action.type) {
    case TOKEN_SET:
      // console.log(action.token);
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
};
export default token;
