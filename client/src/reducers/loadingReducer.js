import { LOADING_START, LOADING_END } from "../actions/types";

const initialState = {
  isLoading: false,
};

export default function loading(state = initialState, action) {
  switch (action.type) {
    case LOADING_START:
      return {
        isLoading: true,
      };
    case LOADING_END:
      return {
        isLoading: false,
      };

    default:
      return state;
  }
}
