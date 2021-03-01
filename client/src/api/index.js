import axios from "axios";

const API = axios.create({ baseURL: "https://ecrypt-trail-deploy.herokuapp.com" });
// const API = axios.create({ baseURL: "http://localhost:9000" });

const cloudinaryAPI = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/ecryptimgdb",
});

//register new user
export const registerNewUser = (formData) =>
  API.post("/user/register", formData);

//Account Activation through Email
export const activation = (activation_token) =>
  API.post("/user/activation", {
    data: {
      activation_token,
    },
  });

//Login
export const login = (formData) =>
  API.post("/user/login", formData, { withCredentials: true });

//get Token
export const getToken = () =>
  API.post("/user/refresh_token", null, { withCredentials: true });
//Logout
export const logout = () => API.get("/user/logout", { withCredentials: true });
//get User

export const getUser = (token) =>
  API.get("/user/info", {
    headers: { Authorization: `${token}` },
  });
//PROFILE SETTINGS__________________________________________________________________________________________
export const editProfile = (token, profileData) =>
  API.post(
    "/user/updateProfile",
    { profileData },
    {
      headers: { Authorization: `${token}` },
    }
  );
//forgot password____
export const forgotPass = (email) =>
  API.post("/user/forgotPassword", { email });

//reset password_____
export const resetPass = (token, password) =>
  API.post(
    "/user/resetPassword",
    { password },
    {
      headers: { Authorization: `${token}` },
    }
  );
//change password____
export const changePass = (oldPassword, newPassword, token) =>
  API.post(
    "/user/changePassword",
    { oldPassword, newPassword },
    {
      headers: { Authorization: `${token}` },
    }
  );
//delete account_____
export const deleteAccount = (password, token) =>
  API.delete("/user/deleteAccount", {
    data: {
      oldPassword: password,
    },
    headers: { Authorization: `${token}` },
  });

//SIGN IN SIGNUP____________________________________________________________________
export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);

//USER FETCH____________________________________________________________________
export const fetchUser = (token) =>
  API.get("/user/info", {
    headers: { Authorization: `${token}` },
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
export const deleteDoc = (doc_id, user_id) =>
  API.delete(`/user/docs/deleteDoc/${doc_id}`, {
    data: {
      user_id: user_id,
    },
  });

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
