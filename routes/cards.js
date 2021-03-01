// import express from "express";
const express = require("express");
const router = express.Router();

const cardsController = require("../controllers/cards");
// import {
//   getCards,
//   addCard,
//   deleteCard,
//   editCard,
//   toggleFav,
// } from "../controllers/cards.js";

// import auth from "../middleware/auth.js";


router.get("/getCards", cardsController.getCards);
router.post("/addCard", cardsController.addCard);
router.delete("/deleteCard/:id", cardsController.deleteCard);
router.patch("/editCard/:id", cardsController.editCard);
router.patch("/toggleFavourite/:id", cardsController.toggleFav);

// export default router;

module.exports = router;
