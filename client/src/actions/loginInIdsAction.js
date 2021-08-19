import {
  FETCH_LOGIN_IDS,
  ADD_NEW_LOGIN_ID,
  EDIT_LOGIN_ID,
  DELETE_LOGIN_ID,
  ADD_TO_FAVOURITE_LOGINS,
  TOGGLE_LOGINS_IS_FAV,
  ADD_ACTIVITY,
  OPERATION_START,
  OPERATION_END,
  PROCESS_START,
  PROCESS_END,
  PROCESS_CLEAR,
} from "./types";
import * as api from "../api";
import moment from "moment";
import {
  loadingSetter,
  authSuccessResponseHandler,
  authErrorResponseHandler,
} from "./auth";
//FETCH LOGINS
export const fetchLoginIds = (user_id) => async (dispatch) => {
  dispatch(loadingSetter(true, "loginIdList", "", "fetching", ""));

  dispatch({
    type: OPERATION_START,
    operation: "fetching",
  });
  try {
    const response = await api.fetchUserLoginIds(user_id);
    const loginIdsData = response.data.reverse();
    dispatch({
      type: FETCH_LOGIN_IDS,
      payload: loginIdsData,
    });
  dispatch(loadingSetter(false, "loginIdList", "", "fetching",true));

    dispatch({
      type: OPERATION_END,
      message: "loginIdsFetched",
    });
  } catch (error) {
  dispatch(loadingSetter(false, "loginIdList", "", "fetching",false));

    console.log(error);
    dispatch({
      type: OPERATION_END,
      message: "fetchingError",
    });
  }
};

// ADD NEW

export const addNewLoginId = (newLoginData, user_id) => async (dispatch) => {
  dispatch(loadingSetter(true, "loginId", "", "add", ""));

  dispatch({
    type: PROCESS_START,
    category: "loginId",
    inProcess: true,
    process: "adding",
    status: null,
  });
  try {
    const response = await api.addNewLoginId(newLoginData, user_id);
    const responseArray = response.data.loginIdsArray;
    const newAddedLoginId = responseArray[responseArray.length - 1];
    console.log("loginId Response", response);
    if (response.status === 201) {
      dispatch({
        type: ADD_NEW_LOGIN_ID,
        payload: newAddedLoginId,
      });
      dispatch({
        type: PROCESS_END,
        category: "loginId",
        inProcess: false,
        process: "adding",
        status: "success",
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
      dispatch(loadingSetter(false, "loginId", "", "add", true));
    } else {
      dispatch({
        type: PROCESS_END,
        category: "loginId",
        inProcess: false,
        process: "adding",
        status: "failed",
      });
    }
  } catch (error) {
    dispatch(loadingSetter(false, "loginId", "", "add", false));

    console.log(error);
    dispatch({
      type: PROCESS_END,
      category: "loginId",
      inProcess: false,
      process: "adding",
      status: "failed",
    });
  }
};

// EDIT LOGIN ID
export const editLoginId =
  (loginId_id, oldData, loginIdData, userId) => async (dispatch) => {
    dispatch(loadingSetter(true, "loginId", loginId_id, "edit", ""));
    dispatch({
      type: OPERATION_START,
      message: "",
      id: loginId_id,
      operation: "edit",
    });

    try {
      // ______________

      // ______________

      const response = await api.editLoginId(loginId_id, loginIdData);

      dispatch({
        type: EDIT_LOGIN_ID,
        payload: loginIdData,
      });

      dispatch({
        type: OPERATION_END,
        message: "loginIdEditSuccess",
      });
      dispatch(loadingSetter(false, "loginId", loginId_id, "edit", true));

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
      dispatch(loadingSetter(false, "loginId", loginId_id, "edit", false));

      console.log(error);
      const failureMsg = error.response.data.msg;
      dispatch({
        type: OPERATION_END,
        message: failureMsg,
      });
    }
  };

// DELETE LOGIN ID
export const deleteLoginId =
  (loginData, loginCardId, user_id) => async (dispatch) => {
    console.log("at delete Login action", loginData, loginCardId, user_id);
    dispatch(loadingSetter(true, "loginId", loginCardId, "delete", ""));

    try {
      dispatch({
        type: OPERATION_START,
        message: "",
        id: loginCardId,
        operation: "delete",
      });
      const response = await api.deleteLoginId(loginCardId, user_id);
      const loginIdsData = response.data.reverse();
      console.log("at delete Login action Response", loginIdsData);

      dispatch({
        type: DELETE_LOGIN_ID,
        payload: loginIdsData,
      });

      dispatch({
        type: OPERATION_END,
        message: "loginIdDeleted",
      });
      dispatch(loadingSetter(false, "loginId", loginCardId, "delete", true));

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
      dispatch(loadingSetter(false, "loginId", loginCardId, "delete", false));

      const failureMsg = error.response.data.msg;

      dispatch({
        type: OPERATION_END,
        message: failureMsg,
      });
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
