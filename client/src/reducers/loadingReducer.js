import { LOADING_SET } from "../actions/types";

const initialState = {
  isLoading: "",
  place: null,
  itemId: "",
  process: "",
  success: "",
};

export default function loading(state = initialState, action) {
  switch (action.type) {
    case LOADING_SET:
      return {
        isLoading: action.loading,
        place: action.place,
        itemId: action.itemId,
        process: action.process,
        success: action.success,
      };
    // case LOADING_END:
    //   return {
    //     isLoading: false,
    //   };

    default:
      return state;
  }
}
