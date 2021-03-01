// import express from "express";
const express = require("express");
const router = express.Router();

const loginsController = require("../controllers/loginIds");
// import {
//   getLoginIds,
//   addLoginId,
//   deleteLoginId,
//   editLoginId,
//   toggleFav,
//   getFavorites,
// } from "../controllers/loginIds.js";

// import auth from "../middleware/auth.js";

const auth = require("../middleware/auth");

router.get("/getLoginIds", loginsController.getLoginIds);
router.get("/getFavorites", loginsController.getFavorites);
router.post("/addLoginId", loginsController.addLoginId);
router.delete("/deleteLoginId/:id", loginsController.deleteLoginId);
router.patch("/editLoginId/:id", loginsController.editLoginId);
router.patch("/toggleFavourite/:id", loginsController.toggleFav);

// export default router;
module.exports = router;
