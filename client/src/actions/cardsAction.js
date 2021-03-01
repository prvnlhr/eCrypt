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
} from "./types";

//FETCHING
export const fetchUserCards = (user_id) => async (dispatch) => {
  try {
    const response = await api.fetchUserCards(user_id);

    const cardsData = response.data.reverse();
    dispatch({
      type: FETCH_CARDS,
      payload: cardsData,
    });
  } catch (error) {}
};
//ADD NEW
export const addNewCard = (newCardData, user_id) => async (dispatch) => {
  try {
    const response = await api.addNewCard(newCardData, user_id);

    const responseArray = response.data.cardsArray;
    const newAddedCard = responseArray[responseArray.length - 1];
    if (response.status === 200) {
      dispatch({
        type: ADD_NEW_CARD,
        payload: newAddedCard,
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
        type: ADD_NEW_CARD_FAILED,
        error: true,
      });
    }
  } catch (error) {}
};

//EDIT CARD
export const editCard = (card_id, cardData, userId) => async (dispatch) => {
  try {
    const response = await api.editCard(card_id, cardData);

    dispatch({
      type: EDIT_CARD,
      payload: cardData,
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
  } catch (error) {}
};
//DELETE CARD
export const deleteCard = (cardData, card_id, user_id) => async (dispatch) => {
  try {
    const response = await api.deleteCard(card_id, user_id);
    const cardsData = response.data.reverse();

    dispatch({
      type: DELETE_CARD,
      payload: cardsData,
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
  } catch (error) {}
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
  } catch (error) {}
};
