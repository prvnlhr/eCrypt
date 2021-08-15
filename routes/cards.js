const express = require("express");
const router = express.Router();
const cardsController = require("../controllers/cards");
router.get("/getCards", cardsController.getCards);
router.post("/addCard", cardsController.addCard);
router.delete("/deleteCard/:id", cardsController.deleteCard);
router.patch("/editCard/:id", cardsController.editCard);
router.patch("/toggleFavourite/:id", cardsController.toggleFav);

module.exports = router;
