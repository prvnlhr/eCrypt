import express from "express";
import {
  getLoginIds,
  addLoginId,
  deleteLoginId,
  editLoginId,
  toggleFav,
  getFavorites,
} from "../controllers/loginIds.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getLoginIds", getLoginIds);
router.get("/getFavorites", getFavorites);
router.post("/addLoginId", addLoginId);
router.delete("/deleteLoginId/:id", deleteLoginId);
router.patch("/editLoginId/:id", editLoginId);
router.patch("/toggleFavourite/:id", toggleFav);

export default router;
