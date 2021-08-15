import { LOADING_START, LOADING_END, LOADING_SET } from "../actions/types";

const initialState = {
  isLoading: false,
  place: null,
};

export default function loading(state = initialState, action) {
  switch (action.type) {
    case LOADING_SET:
      return {
        isLoading: action.loading,
        place: action.place,
      };
    // case LOADING_END:
    //   return {
    //     isLoading: false,
    //   };

    default:
      return state;
  }
}

{
  /* <CircleSpinner size={10} color="#1072f1" loading={true} /> */
}
