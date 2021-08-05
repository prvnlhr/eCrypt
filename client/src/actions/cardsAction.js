import * as api from "../api";
import moment from "moment";

import {
  FETCH_CARDS,
  ADD_NEW_CARD,
  ADD_NEW_CARD_FAILED,
  EDIT_CARD,
  DELETE_CARD,
  TOGGLE_CARDS_IS_FAV,
  ADD_TO_FAVOURITE_CARDS,
  ADD_ACTIVITY,
  OPERATION_START,
  OPERATION_END,
  PROCESS_START,
  PROCESS_END,
  PROCESS_CLEAR,
} from "./types";

//FETCHING
export const fetchUserCards = (user_id) => async (dispatch) => {
  dispatch({
    type: OPERATION_START,
    operation: "fetching",
  });
  try {
    const response = await api.fetchUserCards(user_id);

    dispatch({
      type: OPERATION_END,
      message: "",
    });

    const cardsData = response.data.reverse();
    dispatch({
      type: FETCH_CARDS,
      payload: cardsData,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: OPERATION_END,
      message: "fetchingError",
    });
  }
};
//ADD NEW
export const addNewCard = (newCardData, user_id) => async (dispatch) => {
  dispatch({
    type: PROCESS_START,
    category: "card",
    inProcess: true,
    process: "adding",
    status: null,
  });

  try {
    const response = await api.addNewCard(newCardData, user_id);

    const responseArray = response.data.cardsArray;
    const newAddedCard = responseArray[responseArray.length - 1];
    if (response.status === 200) {
      dispatch({
        type: ADD_NEW_CARD,
        payload: newAddedCard,
      });
      dispatch({
        type: PROCESS_END,
        category: "card",
        inProcess: false,
        process: "adding",
        status: "success",
      });
      const d = moment().format("LLL");
      const activity = {
        date: d,
        task: "Added",
        type: "Card",
        name: newCardData.bank,
        item: newCardData.cardNo,
      };
      const activityResponse = await api.addActivity(activity, user_id);
      dispatch({
        type: ADD_ACTIVITY,
        payload: activity,
      });
    } else {
      dispatch({
        type: PROCESS_END,
        category: "card",
        inProcess: false,
        process: "adding",
        status: "failed",
      });
      dispatch({
        type: ADD_NEW_CARD_FAILED,
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROCESS_END,
      category: "card",
      inProcess: false,
      process: "adding",
      status: "failed",
    });
  }
};

//EDIT CARD
export const editCard = (card_id, cardData, userId) => async (dispatch) => {
  dispatch({
    type: OPERATION_START,
    message: "",
    id: card_id,
    operation: "edit",
  });
  try {
    const response = await api.editCard(card_id, cardData);

    dispatch({
      type: EDIT_CARD,
      payload: cardData,
    });
    dispatch({
      type: OPERATION_END,
      message: "cardEditSuccess",
    });

    const d = moment().format("LLL");
    const activity = {
      date: d,
      task: "Edited",
      type: "Card",
      name: cardData.bank,
      item: cardData.cardNo,
    };
    const activityResponse = await api.addActivity(activity, userId);
    dispatch({
      type: ADD_ACTIVITY,
      payload: activity,
    });
  } catch (error) {
    console.log(error);
    const failureMsg = error.response.data.msg;
    dispatch({
      type: OPERATION_END,
      message: failureMsg,
    });
  }
};
//DELETE CARD
export const deleteCard = (cardData, card_id, user_id) => async (dispatch) => {
  try {
    dispatch({
      type: OPERATION_START,
      message: "",
      id: card_id,
      operation: "delete",
    });
    const response = await api.deleteCard(card_id, user_id);
    const cardsData = response.data.reverse();

    dispatch({
      type: DELETE_CARD,
      payload: cardsData,
    });
    dispatch({
      type: OPERATION_END,
      message: "cardDeleted",
    });
    const d = moment().format("LLL");
    const activity = {
      date: d,
      task: "Deleted",
      type: "Card",
      name: cardData.bank,
      item: cardData.cardNo,
    };
    const activityResponse = await api.addActivity(activity, user_id);

    dispatch({
      type: ADD_ACTIVITY,
      payload: activity,
    });
  } catch (error) {
    const failureMsg = error.response.data.msg;

    dispatch({
      type: OPERATION_END,
      message: failureMsg,
    });
  }
};

export const cardFavToggle = (card_id, isFav) => async (dispatch) => {
  try {
    const response = await api.cardFavouriteToggle(card_id, isFav);

    const dataArray = response.data;
    const favArray = dataArray.filter((item) => item.isFavourite);
    dispatch({
      type: ADD_TO_FAVOURITE_CARDS,
      payload: favArray,
    });
    dispatch({
      type: TOGGLE_CARDS_IS_FAV,
      payload: {
        favValue: isFav,
        id: card_id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearProcess = () => async (dispatch) => {
  try {
    dispatch({
      type: PROCESS_CLEAR,
    });
  } catch (error) {
    console.log(error);
  }
};
