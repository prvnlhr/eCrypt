import * as api from "../api/index.js";
import moment from "moment";

import {
  USER_LOGIN,
  TOKEN_ADD,
  TOKEN_TOKEN,
  TOKEN_SET,
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
  RESPONSE_SUCCESS,
  RESPONSE_ERROR,
  RESPONSE_CLEAR,
  LOADING_SET,
} from "./types";
// REGISTER_________________________________________________________
export const register = (formData) => async (dispatch) => {
  dispatch(loadingSetter("register", true));
  try {
    const response = await api.registerNewUser(formData);
    // dispatch({
    //   type: RESPONSE_SUCCESS,
    //   at: "register",
    //   success: response.data.msg,
    // });
    dispatch(authSuccessResponseHandler(response.data.msg, "register"));

    dispatch(loadingSetter("register", false));
  } catch (error) {
    dispatch(loadingSetter("register", false));
    dispatch(authErrorResponseHandler(error.response.data.msg, "register"));

    // dispatch({
    //   at: "register",
    //   type: RESPONSE_ERROR,
    //   error: error.response.data.msg,
    // });
    console.log("at register action", error.response);
  }
};

//EMAIL ACTIVATION
export const activationEmail = (activation_token) => async (dispatch) => {
  dispatch(loadingSetter("activateAccount", true));

  try {
    const response = await api.activation(activation_token);
    // dispatch({
    //   type: RESPONSE_SUCCESS,
    //   at: "accountActivate",
    //   success: response.data.msg,
    // });
    dispatch(loadingSetter("activateAccount", false));

    dispatch(authSuccessResponseHandler(response.data.msg, "activateAccount"));
  } catch (error) {
    dispatch(loadingSetter("activateAccount", false));

    // dispatch({
    //   type: RESPONSE_ERROR,
    //   at: "activateAccount",
    //   error: error.response.data.msg,
    // });

    dispatch(
      authErrorResponseHandler(error.response.data.msg, "activateAccount")
    );
    console.log("at activate email action", error.response);
  }
};
//LOGIN_________________________________________________________________
export const login = (formData, history) => async (dispatch) => {
  dispatch(loadingSetter("login", true));
  try {
    const response = await api.login(formData);
    const token = response.data;
    console.log("token", token);
    dispatch(authSuccessResponseHandler(response.data.msg, "login"));
    // dispatch({
    //   type: RESPONSE_SUCCESS,
    //   at: "login",
    //   success: response.data.msg,
    // });
    // tokenSetter(dispatch, token);
    dispatch(tokenSetter(token));

    dispatch({
      type: USER_LOGIN,
    });
    dispatch(loadingSetter("login", false));

    history.push("/");
  } catch (error) {
    dispatch(authErrorResponseHandler(error.response.data.msg, "login"));
    dispatch(loadingSetter("login", false));
    console.log("at login action", error, error.response);

    // dispatch({
    //   type: RESPONSE_ERROR,
    //   at: "login",
    //   error: error.response.data.msg,
    // });
  }
};

export const getToken = (history) => async (dispatch) => {
  try {
    const response = await api.getToken();
    const token = response.data;
    dispatch(tokenSetter(token));

    dispatch({
      type: USER_LOGIN,
    });
    // history.push("/");
  } catch (error) {
    console.log("At get token action", error.response.data.msg);
    // dispatch({
    //   type: RESPONSE_ERROR,
    //   at: "token",
    //   error: error.response.data.msg,
    // });
    dispatch(authErrorResponseHandler(error.response.data.msg, "login"));
    dispatch({
      type: USER_LOGOUT,
    });
    // history.push("/login");
  }
};

export const logout = () => async (dispatch) => {
  dispatch(loadingSetter("logout", true));

  try {
    const res = await api.logoutUser();
    dispatch(tokenSetter(""));
    dispatch(loadingSetter("logout", false));
    dispatch({
      type: USER_LOGOUT,
    });
    dispatch(authSuccessResponseHandler(res.data.msg, "login"));
  } catch (error) {
    dispatch(loadingSetter("logout", false));
    console.log("at logout action", error);
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(loadingSetter("forgotPassword", true));

  try {
    const res = await api.forgotPass(email);
    const successMsg = res.data.msg;
    // dispatch({
    //   type: SUCCESS_MESSAGE,
    //   message: successMsg,
    // });
    dispatch(authSuccessResponseHandler(successMsg, "forgotPassword"));
    dispatch(loadingSetter("forgotPassword", false));
  } catch (error) {
    dispatch(loadingSetter("forgotPassword", false));
    const failureMsg = error.response.data.msg;
    dispatch(authErrorResponseHandler(failureMsg, "forgotPassword"));

    // dispatch({
    //   type: ERROR_MESSAGE,
    //   message: failureMsg,
    // });
    // dispatch({
    //   type: LOADING_END,
    // });
  }
};
export const resetPassword = (token, password) => async (dispatch) => {
  dispatch(loadingSetter("resetPassword", true));

  try {
    const res = await api.resetPass(token, password);
    const successMsg = res.data.msg;
    // dispatch({
    //   type: SUCCESS_MESSAGE,
    //   message: successMsg,
    // });
    dispatch(authSuccessResponseHandler(successMsg, "resetPassSuccess"));

    dispatch(loadingSetter("resetPassword", false));
  } catch (error) {
    let errorMsg;
    dispatch(loadingSetter("resetPassword", false));
    const failureMsg = error.response.data.msg;
    if(failureMsg === 'TokenExpiredError!' || "Invalid token!"){
      errorMsg = "Link Expired try again !"
    }else{
      errorMsg = failureMsg;
    }

    // dispatch({
    //   type: ERROR_MESSAGE,
    //   message: failureMsg,
    // });
    dispatch(authErrorResponseHandler(errorMsg, "resetPassword"));
  }
};
//change password api
export const changePassword =
  (oldPassword, newPassword, token, userId) => async (dispatch) => {
    dispatch(loadingSetter("changePassword", true));

    try {
      const res = await api.changePass(oldPassword, newPassword, token);
      const successMsg = res.data.msg;
      // dispatch({
      //   type: SUCCESS_MESSAGE,
      //   message: successMsg,
      // });
      dispatch(authSuccessResponseHandler(successMsg, "changePassword"));

      dispatch(loadingSetter("changePassword", false));

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
      dispatch(loadingSetter("changePassword", false));
      const failureMsg = error.response.data.msg;
      console.log("At change pass action", error);

      // dispatch({
      //   type: ERROR_MESSAGE,
      //   message: error,
      // });
      dispatch(authErrorResponseHandler(failureMsg, "changePassword"));
    }
  };
//delete account api
export const deleteAccount = (password, token) => async (dispatch) => {

  console.log("action delete",token)
  dispatch(loadingSetter("deleteAccount", true));

  try {
    const res = await api.deleteAccount(password, token);
    const logoutResponse = await api.logoutUser();
    const successMsg = res.data.msg;
    // dispatch({
    //   type: SUCCESS_MESSAGE,
    //   message: successMsg,
    // });
    dispatch(authSuccessResponseHandler(successMsg, "login"));

    dispatch(loadingSetter("deleteAccount", false));
    dispatch({
      type: USER_LOGOUT,
      msg: successMsg,
    });
    dispatch(tokenSetter(""));
    dispatch({
      type: REMOVE_USER,
    });

    console.log(res);
  } catch (error) {
    dispatch(loadingSetter("deleteAccount", false));
    const failureMsg = error.response.data.msg;
    dispatch(authErrorResponseHandler(failureMsg, "deleteAccount"));
    // dispatch({
    //   type: ERROR_MESSAGE,
    //   message: failureMsg,
    // });
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
export const updateToken = (token) => {
  return {
    type: TOKEN_SET,
    token: token,
  };
};
export const forceLogout = () => {
  console.log("force logout");
  return {
    type: USER_LOGOUT,
  };
};
export const authSuccessResponseHandler = (msg, at) => {
  return {
    type: RESPONSE_SUCCESS,
    success: msg,
    at: at,
  };
};
export const authErrorResponseHandler = (msg, at) => {
  return {
    type: RESPONSE_ERROR,
    error: msg,
    at: at,
  };
};
export const authResponseClear = () => {
  return {
    type: RESPONSE_CLEAR,
  };
};

export const tokenSetter = (token) => {
  console.log("token", token);
  return {
    type: TOKEN_SET,
    token: token,
  };
};

export const loadingSetter = (place, isLoading) => {
  return {
    type: LOADING_SET,
    loading: isLoading,
    place: place,
  };
};
