import * as api from "../api";
import axios from "axios";
import moment from "moment";

import {
  ADD_NEW_DOC,
  EDIT_DOC,
  DELETE_DOC,
  FETCH_DOCS,
  LOADING_START,
  LOADING_END,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  TOGGLE_DOCS_IS_FAV,
  ADD_TO_FAVOURITE_DOCS,
  ADD_ACTIVITY,
  OPERATION_START,
  OPERATION_END,
  PROCESS_START,
  PROCESS_END,
} from "./types";

//FETCHING
export const fetchDocs = (user_id) => async (dispatch) => {
  dispatch({
    type: OPERATION_START,
    operation: "fetching",
  });
  try {
    const response = await api.fetchDocs(user_id);
    const docsData = response.data.reverse();
    dispatch({
      type: FETCH_DOCS,
      payload: docsData,
    });
    dispatch({
      type: OPERATION_END,
      message: "docsFetched",
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
export const addNewDoc = (data, doc_title, userId) => async (dispatch) => {
  dispatch({
    type: PROCESS_START,
    category: "doc",
    inProcess: true,
    process: "upload",
    status: null,
  });
  try {
    const backendResponse = await api.addNewDoc(data);
    const responseArray = backendResponse.data;
    const newAddedDoc = responseArray[responseArray.length - 1];

    dispatch({
      type: PROCESS_END,
      category: "doc",
      inProcess: false,
      process: "upload",
      status: "success",
    });
    dispatch({
      type: ADD_NEW_DOC,
      payload: newAddedDoc,
    });

    const d = moment().format("LLL");
    const activity = {
      date: d,
      task: "Added",
      type: "Doc",
      name: doc_title,
      item: doc_title,
    };
    const activityResponse = await api.addActivity(activity, userId);
    dispatch({
      type: ADD_ACTIVITY,
      payload: activity,
    });
  } catch (error) {
    dispatch({
      type: PROCESS_END,
      category: "doc",
      inProcess: false,
      process: "upload",
      status: "success",
    });
    console.log(error);
  }
};
// EDIT DOC TITLE
export const editDoc = (doc_Id, userId, docData) => async (dispatch) => {
  console.log("at editDoc Action", doc_Id, userId, docData);
  try {
    const response = await api.editDoc(doc_Id, docData);
    dispatch({
      type: EDIT_DOC,
      payload: docData,
      id: doc_Id,
      operation: "edit",
    });

    const d = moment().format("LLL");
    const activity = {
      date: d,
      task: "Edited",
      type: "Doc",
      name: docData.imageName,
      item: docData.imageName,
    };
    const activityResponse = await api.addActivity(activity, userId);
    dispatch({
      type: ADD_ACTIVITY,
      payload: activity,
    });
  } catch (error) {
    console.log(error);
  }
};

//DELETE DOC
export const deleteDoc =
  (cloud_id, user_id, doc_id, doc_title) => async (dispatch) => {

    dispatch({
      type: PROCESS_END,
      category: "doc",
      inProcess: true,
      process: "delete",
      status: "success",
    });
   
    console.log("deleteDoc Action", cloud_id, user_id, doc_title);

    try {
      // const response = await axios.delete(
      //   "http://localhost:9000/user/docs/deleteDoc",
      //   {
      //     data: {
      //       cloudId: cloud_id,
      //       userId: user_id,
      //       docId: doc_id,
      //     },
      //   }
      // );
      const response = await api.deleteDoc(doc_id, user_id, cloud_id);
      console.log(response.data.msg);
      const docsArray = response.data.data.reverse();
      const successMsg = response.data.msg;
      dispatch({
        type: DELETE_DOC,
        payload: docsArray,
      });
    
      dispatch({
        type: PROCESS_END,
        category: "doc",
        inProcess: false,
        process: "delete",
        status: "success",
      });

      // console.log(response.data.data.msg);

      const d = moment().format("LLL");
      const activity = {
        date: d,
        task: "Deleted",
        type: "Doc",
        name: doc_title,
        item: doc_title,
      };
      const activityResponse = await api.addActivity(activity, user_id);
      dispatch({
        type: ADD_ACTIVITY,
        payload: activity,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PROCESS_END,
        category: "doc",
        inProcess: false,
        process: "delete",
        status: "success",
      });
      const failureMsg = error.response.data.msg;
      dispatch({
        type: OPERATION_END,
        message: failureMsg,
      });
    }
  };
//DOC FAV TOGGLE
export const docFavToggle = (doc_id, isFav) => async (dispatch) => {
  try {
    const response = await api.docsFavouriteToggle(doc_id, isFav);
    const dataArray = response.data;
    const favArray = dataArray.filter((item) => item.isFavourite);
    dispatch({
      type: ADD_TO_FAVOURITE_DOCS,
      payload: favArray,
    });

    dispatch({
      type: TOGGLE_DOCS_IS_FAV,
      payload: {
        favValue: isFav,
        id: doc_id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
