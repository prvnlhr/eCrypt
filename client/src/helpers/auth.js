import cookie from "js-cookie";

//set cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      //!day
      expires: 1,
    });
  }
};
//Remove cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      //!day
      expires: 1,
    });
  }
};

//Get from cookie like token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};
//set in local Storage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//Remove from localStorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

//Auth user after login
export const authenticate = (response) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  // next();
};
//signOut
export const signOut = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
};
//get user info from localStorage
export const isAuth = () => {
  if (window !== undefined) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

//update user data in localStorage

export const updateUser = (response, next) => {
  if (window !== undefined) {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
