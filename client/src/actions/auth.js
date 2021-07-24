import * as api from "../api/index.js";
import moment from "moment";

import {
  USER_LOGIN,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILURE,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  USER_LOGOUT,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  TOKEN_REMOVE,
  REMOVE_USER,
  LOADING_START,
  LOADING_END,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  ADD_ACTIVITY,
} from "./types";
// REGISTER_________________________________________________________
export const register = (formData) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });
  try {
    const response = await api.registerNewUser(formData);
    const successMsg = response.data.msg;
    dispatch({
      type: SUCCESS_MESSAGE,
      message: successMsg,
    });

    dispatch({
      type: LOADING_END,
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

//EMAIL ACTIVATION
export const activationEmail = (activation_token) => async (dispatch) => {
  try {
    const response = await api.activation(activation_token);

    const successMsg = response.data.msg;
    dispatch({
      type: SUCCESS_MESSAGE,
      message: successMsg,
    });
  } catch (error) {
    const failureMsg = error.response.data.msg;

    dispatch({
      type: ERROR_MESSAGE,
      message: failureMsg,
    });
  }
};
//LOGIN_________________________________________________________________
export const login = (formData) => async (dispatch) => {
  console.log("at login auth action", formData);

  dispatch({
    type: LOADING_START,
  });

  try {
    const response = await api.login(formData);
    const successMsg = response.data.msg;
    dispatch({
      type: USER_LOGIN,
      message: successMsg,
    });

    dispatch({
      type: LOADING_END,
    });
    dispatch({
      type: SUCCESS_MESSAGE,
      message: successMsg,
    });
    console.log("logins action success", response);
  } catch (error) {
    const failureMsg = error.response.data.msg;
    console.log("error at auth action ", error.response);
    dispatch({
      type: LOGIN_FAILURE,
      message: failureMsg,
    });
    dispatch({
      type: LOADING_END,
    });
    dispatch({
      type: ERROR_MESSAGE,
      message: failureMsg,
    });
  }
};

export const getToken = () => async (dispatch) => {
  try {
    const response = await api.getToken();
    const token = response.data;
    dispatch({
      type: TOKEN_SUCCESS,
      token,
    });
    dispatch({
      type: USER_LOGIN,
    });
  } catch (error) {
    const failureMsg = error.response.data.msg;
    if (error.response.status === 401) {
      dispatch({
        type: TOKEN_FAILURE,
        failureMsg,
      });

      dispatch({
        type: ERROR_MESSAGE,
        message: failureMsg,
      });

      localStorage.removeItem("isAuthenticated");
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    const res = await api.logout();
    const successMsg = res.data.msg;

    dispatch({
      type: USER_LOGOUT,
      msg: successMsg,
    });

    dispatch({
      type: TOKEN_REMOVE,
    });
    dispatch({
      type: REMOVE_USER,
    });

    dispatch({
      type: SUCCESS_MESSAGE,
      message: successMsg,
    });
  } catch (error) {}
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });
  try {
    const res = await api.forgotPass(email);
    const successMsg = res.data.msg;
    dispatch({
      type: SUCCESS_MESSAGE,
      message: successMsg,
    });
    dispatch({
      type: LOADING_END,
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
export const resetPassword = (token, password) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });
  try {
    const res = await api.resetPass(token, password);
    const successMsg = res.data.msg;
    dispatch({
      type: SUCCESS_MESSAGE,
      message: successMsg,
    });
    dispatch({
      type: LOADING_END,
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
//change password api
export const changePassword =
  (oldPassword, newPassword, token, userId) => async (dispatch) => {
    dispatch({
      type: LOADING_START,
    });
    try {
      const res = await api.changePass(oldPassword, newPassword, token);
      const successMsg = res.data.msg;
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
        name: "Password settings",
        item: "Password changed",
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
//delete account api
export const deleteAccount = (password, token) => async (dispatch) => {
  dispatch({
    type: LOADING_START,
  });
  try {
    const res = await api.deleteAccount(password, token);

    const logoutResponse = await api.logout();
    const successMsg = res.data.msg;
    dispatch({
      type: SUCCESS_MESSAGE,
      message: successMsg,
    });
    dispatch({
      type: LOADING_END,
    });
    localStorage.removeItem("isAuthenticated");

    dispatch({
      type: USER_LOGOUT,
      msg: successMsg,
    });

    dispatch({
      type: TOKEN_REMOVE,
    });
    dispatch({
      type: REMOVE_USER,
    });

    console.log(res);
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

export const clearNotification = (notificationType) => async (dispatch) => {
  try {
    if (notificationType === "error") {
      dispatch({ type: CLEAR_ERROR });
    } else {
      dispatch({ type: CLEAR_SUCCESS });
    }
  } catch (error) {}
};
