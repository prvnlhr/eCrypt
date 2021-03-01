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
  TOGGLE_DOCS_IS_FAV,
  ADD_TO_FAVOURITE_DOCS,
  ADD_ACTIVITY,
} from "./types";

//FETCHING
export const fetchDocs = (user_id) => async (dispatch) => {
  try {
    const response = await api.fetchDocs(user_id);

    const docsData = response.data.reverse();
    dispatch({
      type: FETCH_DOCS,
      payload: docsData,
    });
  } catch (error) {}
};

//ADD NEW
export const addNewDoc = (data, doc_title, userId) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_START,
    });
    const backendResponse = await api.addNewDoc(data);
    const responseArray = backendResponse.data;
    const newAddedDoc = responseArray[responseArray.length - 1];

    dispatch({
      type: LOADING_END,
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
    console.log(error);
  }
};
// EDIT DOC TITLE
export const editDoc = (doc_Id, userId, docData) => async (dispatch) => {
  try {
    const response = await api.editDoc(doc_Id, docData);
    dispatch({
      type: EDIT_DOC,
      payload: docData,
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
  } catch (error) {}
};

//DELETE DOC
export const deleteDoc = (cloud_id, user_id, doc_id, doc_title) => async (
  dispatch
) => {

  try {
    const response = await axios.delete(
      "http://localhost:9000/user/docs/deleteDoc",
      {
        data: {
          cloudId: cloud_id,
          userId: user_id,
          docId: doc_id,
        },
      }
    );
    const docsArray = response.data.reverse();
    dispatch({
      type: DELETE_DOC,
      payload: docsArray,
    });

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
  } catch (error) {}
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
  } catch (error) {}
};
