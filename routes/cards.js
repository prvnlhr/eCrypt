import express from "express";
import {
  getCards,
  addCard,
  deleteCard,
  editCard,
  toggleFav,
} from "../controllers/cards.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getCards", getCards);
router.post("/addCard", addCard);
router.delete("/deleteCard/:id", deleteCard);
router.patch("/editCard/:id", editCard);
router.patch("/toggleFavourite/:id", toggleFav);

export default router;
