import {
  FETCH_LOGIN_IDS,
  ADD_NEW_LOGIN_ID,
  EDIT_LOGIN_ID,
  DELETE_LOGIN_ID,
  ADD_TO_FAVOURITE_LOGINS,
  TOGGLE_LOGINS_IS_FAV,
  ADD_ACTIVITY,
} from "./types";
import * as api from "../api";
import moment from "moment";

//FETCH LOGINS
export const fetchLoginIds = (user_id) => async (dispatch) => {
  try {
    const response = await api.fetchUserLoginIds(user_id);

    const loginIdsData = response.data.reverse();
    dispatch({
      type: FETCH_LOGIN_IDS,
      payload: loginIdsData,
    });
  } catch (error) {
  }
};

// ADD NEW

export const addNewLoginId = (newLoginData, user_id) => async (dispatch) => {
  try {
    const response = await api.addNewLoginId(newLoginData, user_id);
    const responseArray = response.data.loginIdsArray;

    const newAddedLoginId = responseArray[responseArray.length - 1];
    dispatch({
      type: ADD_NEW_LOGIN_ID,
      payload: newAddedLoginId,
    });
    const d = moment().format("LLL");
    const activity = {
      date: d,
      task: "Added",
      type: "Login",
      name: newLoginData.website,
      item: newLoginData.username,
    };
    const activityResponse = await api.addActivity(activity, user_id);
    dispatch({
      type: ADD_ACTIVITY,
      payload: activity,
    });
  } catch (error) {
  }
};

// EDIT LOGIN ID
export const editLoginId = (loginId_id, loginIdData, userId) => async (
  dispatch
) => {
  try {
    const response = await api.editLoginId(loginId_id, loginIdData);

    dispatch({
      type: EDIT_LOGIN_ID,
      payload: loginIdData,
    });
    
    const d = moment().format("LLL");
    const activity = {
      date: d,
      task: "Edited",
      type: "Login",
      name: loginIdData.website,
      item: loginIdData.username,
    };
    const activityResponse = await api.addActivity(activity, userId);

    dispatch({
      type: ADD_ACTIVITY,
      payload: activity,
    });
  } catch (error) {
  }
};

// DELETE LOGIN ID
export const deleteLoginId = (loginData, loginCardId, user_id) => async (
  dispatch
) => {
  try {
    const response = await api.deleteLoginId(loginCardId, user_id);
    const loginIdsData = response.data.reverse();

    dispatch({
      type: DELETE_LOGIN_ID,
      payload: loginIdsData,
    });
    const d = moment().format("LLL");
    const activity = {
      date: d,
      task: "Deleted",
      type: "Login",
      name: loginData.website,
      item: loginData.username,
    };
    const activityResponse = await api.addActivity(activity, user_id);

    dispatch({
      type: ADD_ACTIVITY,
      payload: activity,
    });
  } catch (error) {
  }
};

export const loginIdFavToggle = (loginId_id, isFav) => async (dispatch) => {
  try {
    const response = await api.loginIdFavouriteToggle(loginId_id, isFav);
    const dataArray = response.data;
    const favArray = dataArray.filter((item) => item.isFavourite);
    dispatch({
      type: ADD_TO_FAVOURITE_LOGINS,
      payload: favArray,
    });

    dispatch({
      type: TOGGLE_LOGINS_IS_FAV,
      payload: {
        favValue: isFav,
        id: loginId_id,
      },
    });
  } catch (error) {
  }
};
