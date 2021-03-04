const express = require("express");
const router = express.Router();

const activityController = require("../controllers/activity");

router.post("/addActivity", activityController.addActivity);
router.get("/getActivities", activityController.getActivities);

module.exports = router;
