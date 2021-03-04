const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/user/cards", require("./cards"));
router.use("/user/loginIds", require("./loginIds"));
router.use("/user/docs", require("./documents"));
router.use("/user/activity", require("./activity"));
//____________________________

module.exports = router;
