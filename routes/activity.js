import express from "express";

const router = express.Router();

import { addActivity, getActivities } from "../controllers/activity.js";

router.post("/addActivity", addActivity);
router.get("/getActivities", getActivities);

export default router;
