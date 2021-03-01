import express from "express";
const router = express.Router();

import {
  getUser,
  register,
  activateEmail,
  login,
  getAccessToken,
  forgotPassword,
  resetPassword,
  getUserInfo,
  logout,
  changePassword,
  deleteAccountPermanently,
  updateProfile,
} from "../controllers/user.js";

import auth from "../middleware/auth.js";
router.get("/getUser", auth, getUser);
router.post("/register", register);
router.post("/activation", activateEmail);
router.post("/login", login);
router.post("/refresh_token", getAccessToken);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", auth, resetPassword);
router.post("/changePassword", auth, changePassword);
router.post("/updateProfile", auth, updateProfile);
router.delete("/deleteAccount", auth, deleteAccountPermanently);
router.get("/logout", logout);
router.get("/info", auth, getUserInfo);

export default router;
