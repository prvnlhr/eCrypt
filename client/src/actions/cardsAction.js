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
  EDIT_SEARCH_ITEM,
  DELETE_SEARCH_ITEM,
  CARDS_FETCH_LOADING,
} from "./types";
import { loadingSetter } from "./auth";

//FETCHING
export const fetchUserCards = (user_id) => async (dispatch) => {
  dispatch(cardsFetchLoadingSetter(true));

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
    dispatch(cardsFetchLoadingSetter(false));
  } catch (error) {
    dispatch(cardsFetchLoadingSetter(false));
    console.log(error);
    dispatch({
      type: OPERATION_END,
      message: "fetchingError",
    });
  }
};
//ADD NEW
export const addNewCard = (newCardData, user_id) => async (dispatch) => {
  dispatch(loadingSetter(true, "card", "", "add", ""));

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
      dispatch(loadingSetter(false, "card", "", "add", true));

      const d = moment().format("LLL");

      const activity = {
        date: d,
        task: "Added",
        type: "Card",
        name: newCardData.bank,
        item: newCardData.cardNo,
      };
      const day = moment().format("DD");
      const month = moment().format("MMM");
      const time = moment().format("h:mma");
      const dynamicActivity = {
        date: day,
        month: month,
        time: time,
        type: "card",
        action: "add",
        CNo: newCardData.cardNo,
        bank: newCardData.bank,
        cvv: newCardData.cvv,
        user: newCardData.user,
        expiry: newCardData.expiry,
      };
      const activityResponse = await api.addActivity(
        activity,
        user_id,
        dynamicActivity
      );
      dispatch({
        type: ADD_ACTIVITY,
        payload: dynamicActivity,
      });
    } else {
      dispatch(loadingSetter(false, "card", "", "add", false));

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
    dispatch(loadingSetter(false, "card", "", "add", false));

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
export const editCard =
  (card_id, cardData, userId, oldCardData, searchListArrayLength) =>
  async (dispatch) => {
    dispatch(loadingSetter(true, "card", card_id, "edit", ""));

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
      if (searchListArrayLength > 0) {
        dispatch({
          type: EDIT_SEARCH_ITEM,
          payload: cardData,
        });
      }
      dispatch(loadingSetter(false, "card", card_id, "edit", true));
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
      const day = moment().format("DD");
      const month = moment().format("MMM");
      const time = moment().format("h:mma");
      const dynamicActivity = {
        date: day,
        month: month,
        time: time,
        type: "card",
        action: "edit",
        oldCNo: oldCardData.cardNo,
        newCNo: cardData.cardNo,
        oldBank: oldCardData.bank,
        newBank: cardData.bank,
        oldCvv: oldCardData.cvv,
        newCvv: cardData.cvv,
        oldUser: oldCardData.user,
        newUser: cardData.user,
        oldExpiry: oldCardData.expiry,
        newExpiry: cardData.expiry,
      };
      const activityResponse = await api.addActivity(
        activity,
        userId,
        dynamicActivity
      );
      dispatch({
        type: ADD_ACTIVITY,
        payload: dynamicActivity,
      });
    } catch (error) {
      dispatch(loadingSetter(false, "card", card_id, "edit", false));

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
  dispatch(loadingSetter(true, "card", card_id, "delete", ""));

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
      type: DELETE_SEARCH_ITEM,
      payload: cardData,
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
    const day = moment().format("DD");
    const month = moment().format("MMM");
    const time = moment().format("h:mma");
    const dynamicActivity = {
      date: day,
      month: month,
      time: time,
      type: "card",
      action: "delete",
      CNo: cardData.cardNo,
      bank: cardData.bank,
      cvv: cardData.cvv,
      user: cardData.user,
      expiry: cardData.expiry,
    };
    dispatch(loadingSetter(false, "card", card_id, "delete", true));

    const activityResponse = await api.addActivity(
      activity,
      user_id,
      dynamicActivity
    );

    dispatch({
      type: ADD_ACTIVITY,
      payload: dynamicActivity,
    });
  } catch (error) {
    dispatch(loadingSetter(false, "card", card_id, "delete", false));

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

export const cardsFetchLoadingSetter = (value) => {
  return {
    type: CARDS_FETCH_LOADING,
    cardFetching: value,
  };
};
