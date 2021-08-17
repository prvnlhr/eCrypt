import {
  FETCH_DOCS,
  DELETE_DOC,
  ADD_NEW_DOC,
  EDIT_DOC,
  TOGGLE_DOCS_IS_FAV,
} from "../actions/types";


const initialState = {
  docs: [],
};

export default function docs(state = initialState, action) {
  switch (action.type) {
    //Fetching
    case FETCH_DOCS:
      return {
        docs: action.payload,
      };
    //Deleting
    case DELETE_DOC:
      // console.log(action.payload, "at reducer delete doc");
      return {
        ...state,
        docs: action.payload,
      };

    case EDIT_DOC:
      // console.log(action.payload, "at reducer edit doc");
      const newArray = state.docs.map((doc) => {
        if (doc._id === action.payload._id) {
          return action.payload;
        } else {
          return doc;
        }
      });
      return {
        docs: newArray,
      };

    //Adding new
    case ADD_NEW_DOC:
      return {
        ...state,
        docs: [action.payload, ...state.docs],
      };
    case TOGGLE_DOCS_IS_FAV:
      const favVal = action.payload.favValue;
      const id = action.payload.id;
      const old = state.docs;
      const newDocsArray = old.map((d) => {
        if (d._id === id) {
          return { ...d, isFavourite: favVal };
        } else {
          return d;
        }
      });
      return {
        ...state,
        docs: newDocsArray,
      };

    default:
      return state;
  }
}
