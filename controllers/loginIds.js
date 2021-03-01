import UserDatabase from "../models/userData.js";
import mongoose from "mongoose";

//GET ALL SAVE LOGINS FOR A USER
export const getLoginIds = async (req, res) => {
  try {
    const loginIds = await UserDatabase.findOne({ _id: req.query.user_id });
    res.status(200).send(loginIds.loginIdsArray);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//ADD NEW LOGIN
export const addLoginId = async (req, res) => {
  try {
    const response = await UserDatabase.findOneAndUpdate(
      { _id: req.body.user_id },
      { $push: { loginIdsArray: req.body.data } },
      { returnOriginal: false }
    );
    const data = response;
    res.status(201).send(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//DELETE EXISTING LOGIN
export const deleteLoginId = async (req, res) => {
  const loginIdID = req.params.id;
  const userId = req.body.user_id;
  try {
    const response = await UserDatabase.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          loginIdsArray: {
            _id: loginIdID,
          },
        },
      },
      { returnOriginal: false }
    );
    res.status(200).send(response.loginIdsArray);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editLoginId = async (req, res) => {
  const id = req.params.id;
  const { website, username, password } = req.body;

  try {
    const response = await UserDatabase.findOneAndUpdate(
      { "loginIdsArray._id": id },
      {
        $set: {
          "loginIdsArray.$.website": website,
          "loginIdsArray.$.username": username,
          "loginIdsArray.$.password": password,
        },
      },
      { returnOriginal: false }
    );
    res.status(201).json(response.loginIdsArray);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const toggleFav = async (req, res) => {
  const id = req.params.id;

  const isFav = req.body.data;

  try {
    const response = await UserDatabase.findOneAndUpdate(
      { "loginIdsArray._id": id },
      {
        $set: {
          "loginIdsArray.$.isFavourite": isFav,
        },
      },
      { returnOriginal: false }
    );
    res.status(201).json(response.loginIdsArray);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const response = await UserDatabase.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.query.user_id) } },

      {
        $project: {
          loginIdsArray: {
            $filter: {
              input: "$loginIdsArray",
              as: "item",
              cond: { $eq: ["$$item.isFavourite", true] },
            },
          },
          cardsArray: {
            $filter: {
              input: "$cardsArray",
              as: "item",
              cond: { $eq: ["$$item.isFavourite", true] },
            },
          },
          docsArray: {
            $filter: {
              input: "$docsArray",
              as: "item",
              cond: { $eq: ["$$item.isFavourite", true] },
            },
          },
        },
      },
    ]);

    res.status(200).send(response);
  } catch (error) {
    res.status(404).json(error);
  }
};
