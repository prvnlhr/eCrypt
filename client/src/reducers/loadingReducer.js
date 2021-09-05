import {
  LOADING_SET,
  CARDS_FETCH_LOADING,
  LOGINIDS_FETCH_LOADING,
  DOCS_FETCH_LOADING,
} from "../actions/types";

const initialState = {
  isLoading: "",
  place: null,
  itemId: "",
  process: "",
  success: "",
  cardFetching: "",
  loginsFetching: "",
  docsFetching: "",
};

export default function loading(state = initialState, action) {
  switch (action.type) {
    case LOADING_SET:
      return {
        ...state,
        isLoading: action.loading,
        place: action.place,
        itemId: action.itemId,
        process: action.process,
        success: action.success,
      };
    case CARDS_FETCH_LOADING:
      return {
        ...state,
        cardFetching: action.cardFetching,
      };
    case LOGINIDS_FETCH_LOADING:
      return {
        ...state,
        loginsFetching: action.loginsFetching,
      };
    case DOCS_FETCH_LOADING:
      return {
        ...state,
        docsFetching: action.docsFetching,
      };

    default:
      return state;
  }
}
