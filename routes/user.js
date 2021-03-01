// import express from "express";
const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

// import {
//   getUser,
//   register,
//   activateEmail,
//   login,
//   getAccessToken,
//   forgotPassword,
//   resetPassword,
//   getUserInfo,
//   logout,
//   changePassword,
//   deleteAccountPermanently,
//   updateProfile,
// } from "../controllers/user.js";

// import auth from "../middleware/auth.js";
const auth = require("../middleware/auth");

router.get("/getUser", auth, userController.getUser);
router.post("/register", userController.register);
router.post("/activation", userController.activateEmail);
router.post("/login", userController.login);
router.post("/refresh_token", userController.getAccessToken);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword", auth, userController.resetPassword);
router.post("/changePassword", auth, userController.changePassword);
router.post("/updateProfile", auth, userController.updateProfile);
router.delete("/deleteAccount", auth, userController.deleteAccountPermanently);
router.get("/logout", userController.logout);
router.get("/info", auth, userController.getUserInfo);

// export default router;
module.exports = router;
