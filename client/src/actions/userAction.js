import * as api from "../api";
import moment from "moment";

import {
  FETCH_USER,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  UPDATE_USER_PROFILE,
  LOADING_START,
  LOADING_END,
  ADD_ACTIVITY,
} from "./types";

export const fetchUser = (token) => async (dispatch) => {
  try {
    const response = await api.fetchUser(token);
    const userData = response.data.user;
    const nameString = userData.name.split(/[" "]+/);
    const data = {
      _id: userData._id,
      firstName: nameString[0],
      lastName: nameString[1],
      email: userData.email,
    };

    dispatch({
      type: FETCH_USER,
      payload: data,
    });
  } catch (error) {

    const failureMsg = error.response.data.msg;
    dispatch({
      type: ERROR_MESSAGE,
      message: failureMsg,
    });
  }
};

//Update Profile
export const updateProfile = (token, profileData, userId) => async (
  dispatch
) => {
  dispatch({
    type: LOADING_START,
  });
  try {
    const response = await api.editProfile(token, profileData);
    const userData = response.data.newData;
    const successMsg = response.data.msg;
    const nameString = userData.name.split(/[" "]+/);
    const data = {
      _id: userData._id,
      firstName: nameString[0],
      lastName: nameString[1],
      email: userData.email,
    };
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: data,
    });
    dispatch({
      type: SUCCESS_MESSAGE,
      message: successMsg,
    });
    dispatch({
      type: LOADING_END,
    });

    const d = moment().format("LLL");
    const activity = {
      date: d,
      task: "Edited",
      type: "Settings",
      name: "Profile settings",
      item: "Profile updated",
    };
    const activityResponse = await api.addActivity(activity, userId);
    dispatch({
      type: ADD_ACTIVITY,
      payload: activity,
    });
  } catch (error) {
    const failureMsg = error.response.data.msg;
    dispatch({
      type: ERROR_MESSAGE,
      message: failureMsg,
    });
    dispatch({
      type: LOADING_END,
    });
  }
};
