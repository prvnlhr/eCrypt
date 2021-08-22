import * as api from "../api";

import { FETCH_ACTIVITIES, ERROR_MESSAGE } from "./types";

export const fetchActivity = (user_id) => async (dispatch) => {
  try {
    const response = await api.fetchUserActivities(user_id);
    const activitiesData = response.data.reverse();
    console.log("Actvity action get", activitiesData);

    dispatch({
      type: FETCH_ACTIVITIES,
      payload: activitiesData,
    });
  } catch (error) {
    const failureMsg = error.response.data.msg;
    dispatch({
      type: ERROR_MESSAGE,
      message: failureMsg,
    });
  }
};
