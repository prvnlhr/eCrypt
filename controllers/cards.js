// import UserDatabase from "../models/userData.js";
const UserDatabase = require("../models/userData");

const cardsController = {
  getCards: async (req, res) => {
    try {
      const cards = await UserDatabase.findOne({ _id: req.query.user_id });
      res.status(200).send(cards.cardsArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  addCard: async (req, res) => {
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { _id: req.body.user_id },
        {
          $push: {
            cardsArray: req.body.data,
          },
        },
        { returnOriginal: false }
      );
      res.status(200).send(response);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  deleteCard: async (req, res) => {
    const cardId = req.params.id;
    const userId = req.body.user_id;
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { _id: userId },
        {
          $pull: {
            cardsArray: {
              _id: cardId,
            },
          },
        },
        { returnOriginal: false }
      );
      res.status(200).send(response.cardsArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  editCard: async (req, res) => {
    const id = req.params.id;
    const { tag, user, bank, cardNo, expiry, cvv, pin } = req.body;
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { "cardsArray._id": id },
        {
          $set: {
            "cardsArray.$.tag": tag,
            "cardsArray.$.user": user,
            "cardsArray.$.bank": bank,
            "cardsArray.$.cardNo": cardNo,
            "cardsArray.$.expiry": expiry,
            "cardsArray.$.cvv": cvv,
            "cardsArray.$.pin": pin,
          },
        },
        { returnOriginal: false }
      );

      res.status(201).json(response.cardsArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  toggleFav: async (req, res) => {
    const id = req.params.id;
    const isFav = req.body.data;
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { "cardsArray._id": id },
        {
          $set: {
            "cardsArray.$.isFavourite": isFav,
          },
        },
        { returnOriginal: false }
      );
      res.status(201).json(response.cardsArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = cardsController;
