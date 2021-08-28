import {
  SEARCH,
  EDIT_SEARCH_ITEM,
  DELETE_SEARCH_ITEM,
  TOGGLE_SEARCH_FAV,
} from "../actions/types";
const initialState = {
  searchResults: [],
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      const key = action.payload.query;
      // console.log(dataArray);
      const newDataArray = action.payload.data.filter(
        (item) =>
          item.website?.toLowerCase().includes(key.toLowerCase()) ||
          item.username?.toLowerCase().includes(key.toLowerCase()) ||
          item.user?.toLowerCase().includes(key.toLowerCase()) ||
          item.bank?.toLowerCase().includes(key.toLowerCase()) ||
          item.imageName?.toLowerCase().includes(key.toLowerCase())
      );

      return {
        ...state,
        searchResults: newDataArray,
      };
    case EDIT_SEARCH_ITEM:
      const newArray = state.searchResults.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        } else {
          return item;
        }
      });

      return {
        ...state,
        searchResults: newArray,
      };
    case TOGGLE_SEARCH_FAV:
      return {
        ...state,
        searchResults: newDataArray,
      };

    case DELETE_SEARCH_ITEM:
      return {
        searchResults: [
          ...state.searchResults.filter(
            (item) => item._id !== action.payload._id
          ),
        ],
      };

    default:
      return state;
  }
}
