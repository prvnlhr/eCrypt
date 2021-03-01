// import express from "express";
const express = require("express");
const router = express.Router();

// import { addActivity, getActivities } from "../controllers/activity.js";

const activityController = require("../controllers/activity");

router.post("/addActivity", activityController.addActivity);
router.get("/getActivities", activityController.getActivities);

// export default router;
module.exports = router;
