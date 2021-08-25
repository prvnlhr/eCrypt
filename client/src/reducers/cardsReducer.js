import {
  FETCH_CARDS,
  ADD_NEW_CARD,
  ADD_NEW_CARD_FAILED,
  EDIT_CARD,
  DELETE_CARD,
  TOGGLE_CARDS_IS_FAV,
} from "../actions/types";

const initialState = {
  cards: [],
};

export default function cards(state = initialState, action) {
  switch (action.type) {

    case DELETE_CARD:
      return {
        cards: action.payload,
      };
    case FETCH_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    //Adding new
    case ADD_NEW_CARD:
      return {
        ...state,
        cards: [action.payload, ...state.cards],
      };
    case ADD_NEW_CARD_FAILED:
      return {
        cards: [...state.cards],
        error: true,
      };
    //Editing
    case EDIT_CARD:
      const index = state.cards.findIndex(
        (card) => card._id === action.payload._id
      );
      const newArray = [...state.cards];
      newArray[index] = action.payload;
      return {
        cards: newArray,
      };
    case TOGGLE_CARDS_IS_FAV:
      const favVal = action.payload.favValue;
      const id = action.payload.id;
      const old = state.cards;
      const newCardsArray = old.map((c) => {
        if (c._id === id) {
          return { ...c, isFavourite: favVal };
        } else {
          return c;
        }
      });
      return {
        ...state,
        cards: newCardsArray,
      };

    default:
      return state;
  }
}
