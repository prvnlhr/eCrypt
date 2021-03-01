const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/user/cards", require("./cards"));
router.use("/user/loginIds", require("./loginIds"));
router.use("/user/docs", require("./documents"));
router.use("/user/activity", require("./activity"));
//____________________________

// import express from "express";
// const router = express.Router();

// import userRoutes from "./user.js";
// import loginIdsRoutes from "./loginIds.js";
// import cardsRoutes from "./cards.js";
// import docsRoutes from "./documents.js";
// import activityRoutes from "./activity.js";

// router.use("/user", userRoutes);
// router.use("/user/cards", cardsRoutes);
// router.use("/user/loginIds", loginIdsRoutes);
// router.use("/user/docs", docsRoutes);
// router.use("/user/activity", activityRoutes);
// export default router;

module.exports = router;
