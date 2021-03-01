import { SEARCH } from "../actions/types";
const initialState = {
  searchResults: [],
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      const key = action.payload.query;
      const dataArray = action.payload.data;
      console.log(dataArray);
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

    default:
      return state;
  }
}
