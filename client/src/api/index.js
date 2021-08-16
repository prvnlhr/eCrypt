import axios from "axios";
import { store } from "../store/index";
import { logout, updateToken } from "../actions/auth";
// import  store  from "../store/index";
let url = process.env.REACT_APP_BASE_URL;
console.log(process.env.REACT_APP_BASE_URL)
const API = axios.create({
  baseURL: url,
});

// const API = axios.create({ baseURL: "http://localhost:9000" });

const reqHandler = (request) => {
  console.log("request", request);
  return request;
};
const resHandler = (response) => {
  if (response.status === 401) {
    console.log("401 error");
  }
  console.log("response", response);
  return response;
};
const errorHandler = (error) => {
  const originalRequest = error.config;
  // console.log("401 error", error.response.status, error.config);
  // console.log("/user/auth/refresh_token", error.config.url);
  // console.log("/user/auth/refresh_token" === error.config.url);
  if (
    error.response.status === 401 &&
    error.config.url !== "/user/auth/refresh_token" &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    return axios
      .post(`${url}/user/auth/refresh_token`, null, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          // console.log("res Hogaya", res.data);
          store.dispatch(updateToken(res.data));
          // console.log("originalRequestPrev", originalRequest);
          originalRequest.headers["Authorization"] = "Bearer " + res.data;
          // console.log("originalRequestModified", originalRequest);
          return axios(originalRequest);
        }
      })
      .catch((err) => {
        // console.log(err.response.status);
        // console.log("token refreshing error at interceptor", err.response);
        if (err.response.status === 401) {
          store.dispatch(logout());
        }
        return Promise.reject(error);
      });
  }
  return Promise.reject(error);
};

API.interceptors.request.use(
  (request) => reqHandler(request),
  (error) => errorHandler(error)
);
API.interceptors.response.use(
  (response) => resHandler(response),
  (error) => errorHandler(error)
);

const cloudinaryAPI = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/ecryptimgdb",
});

//register new user
export const registerNewUser = (formData) =>
  API.post("/user/auth/register", formData);

//Account Activation through Email
export const activation = (activation_token) =>
  API.post("/user/auth/activation", {
    data: {
      activation_token,
    },
  });

//Login
export const login = (formData) =>
  API.post("/user/auth/login", formData, {
    withCredentials: true,
  });

//get Token
export const getToken = () =>
  API.post("/user/auth/refresh_token", null, {
    withCredentials: true,
  });
//Logout
export const logoutUser = () =>
  API.get("/user/auth/logout", { withCredentials: true });
//get User

export const getUser = (token) =>
  API.get("/user/auth/info", {
    headers: { Authorization: `${token}` },
  });
//PROFILE SETTINGS__________________________________________________________________________________________
export const editProfile = (token, profileData) =>
  API.post(
    "/user/auth/updateProfile",
    { profileData },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
//forgot password____
export const forgotPass = (email) =>
  API.post("/user/auth/forgotPassword", { email });

//reset password_____
export const resetPass = (token, password) =>
  API.post(
    "/user/auth/resetPassword",
    { password },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
//change password____
export const changePass = (oldPassword, newPassword, token) =>
  API.post(
    "/user/auth/changePassword",
    { oldPassword, newPassword },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
//delete account_____
export const deleteAccount = (password, token) =>
  API.delete(
    "/user/auth/deleteAccount",
    {
      data: {
        oldPassword: password,
      },
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

//SIGN IN SIGNUP____________________________________________________________________
export const signIn = (formData) => API.post("/user/auth/signin", formData);

export const signUp = (formData) => API.post("/user/auth/signup", formData);

//USER FETCH____________________________________________________________________
export const fetchUser = (token) =>
  API.get("/user/auth/info", {
    headers: { Authorization: `Bearer ${token}` },
  });

// CARDS URLS______________________________________________________________________
export const fetchUserCards = (user_id) =>
  API.get("/user/cards/getCards", {
    params: {
      user_id: user_id,
    },
  });
//add card____
export const addNewCard = (newCardData, user_id) =>
  API.post("/user/cards/addCard", {
    data: newCardData,
    user_id: user_id,
  });
//edit card___
export const editCard = (card_id, cardData) =>
  API.patch(`/user/cards/editCard/${card_id}`, cardData);

export const deleteCard = (card_id, user_id) =>
  API.delete(`/user/cards/deleteCard/${card_id}`, {
    data: {
      user_id: user_id,
    },
  });

// LOGINIDS URLS______________________________________________________________________
export const fetchUserLoginIds = (user_id) =>
  API.get("/user/loginIds/getLoginIds", {
    params: {
      user_id: user_id,
    },
  });
//add loginId____
export const addNewLoginId = (newLoginData, user_id) =>
  API.post("/user/loginIds/addLoginId", {
    data: newLoginData,
    user_id: user_id,
  });
//edit loginId___
export const editLoginId = (loginId_id, loginIdData) =>
  API.patch(`/user/loginIds/editLoginId/${loginId_id}`, loginIdData);
//delete loginId____
export const deleteLoginId = (loginCardId, user_id) =>
  API.delete(`/user/loginIds/deleteLoginId/${loginCardId}`, {
    data: { user_id: user_id },
  });

//FAVOURITE TOGGLE URL_____________________________________________________________________
export const loginIdFavouriteToggle = (loginCard_Id, isFav) =>
  API.patch(`/user/loginIds/toggleFavourite/${loginCard_Id}`, {
    data: isFav,
  });

export const cardFavouriteToggle = (card_id, isFav) =>
  API.patch(`/user/cards/toggleFavourite/${card_id}`, {
    data: isFav,
  });
export const docsFavouriteToggle = (doc_id, isFav) =>
  API.patch(`/user/docs/toggleFavourite/${doc_id}`, {
    data: isFav,
  });
export const fetchFavorites = (user_id) =>
  API.get("/user/loginIds/getFavorites", {
    params: {
      user_id: user_id,
    },
  });

//Docs Api___________________________________________________________-------
export const fetchDocs = (user_id) =>
  API.get("/user/docs/getDocs", {
    params: {
      user_id: user_id,
    },
  });
//add new doc___
export const addNewDoc = (data) => API.post("/user/docs/addDoc", data);

//edit doc___
export const editDoc = (doc_Id, docData) =>
  API.patch(`/user/docs/editDoc/${doc_Id}`, docData);
//delete doc___
export const deleteDoc = (doc_id, user_id, cloud_id) =>
  API.delete(`/user/docs/deleteDoc/${doc_id}`, {
    data: {
      userId: user_id,
      cloudId: cloud_id,
    },
  });

// export const deleteUserDoc = (doc_id, user_id, cloud_id) =>
//   API.delete(`/user/docs/deleteDoc`, {
//     data: {
//       userId: user_id,
//       docId: doc_id,
//       cloudId: cloud_id,
//     },
//   });

//ACTIVITY API___________________________________________________________________________________________
export const fetchUserActivities = (user_id) =>
  API.get("/user/activity/getActivities", {
    params: {
      user_id: user_id,
    },
  });
//add activity___
export const addActivity = (activity, user_id) =>
  API.post("/user/activity/addActivity", {
    data: activity,
    user_id: user_id,
  });
