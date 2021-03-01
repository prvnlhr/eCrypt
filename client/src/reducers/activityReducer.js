import { ADD_ACTIVITY, FETCH_ACTIVITIES } from "../actions/types";
const initialState = {
  activities: [],
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case ADD_ACTIVITY:
      return {
        ...state,
        activities: [action.payload, ...state.activities],
      };

    default:
      return state;
  }
}
