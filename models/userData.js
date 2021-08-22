// import mongoose from "mongoose";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cardsArray: [
      {
        user: {
          type: String,
          required: true,
        },
        bank: {
          type: String,
          required: true,
        },
        cardNo: {
          type: Number,
          required: true,
        },
        expiry: {
          type: String,
          required: true,
        },
        cvv: {
          type: Number,
          required: true,
        },
        pin: {
          type: Number,
          required: true,
        },
        isFavourite: {
          type: Boolean,
          default: false,
        },
      },
    ],
    loginIdsArray: [
      {
        website: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },

        isFavourite: {
          type: Boolean,
          default: false,
          required: true,
        },
      },
    ],
    docsArray: [
      {
        imageName: {
          type: String,
          required: true,
        },

        imageUrl: {
          type: String,
          required: true,
        },

        cloudinary_id: {
          type: String,
          required: true,
        },
        isFavourite: {
          type: Boolean,
          default: false,
        },
      },
    ],
    activitiesArray: [
      {
        date: {
          type: String,
          required: true,
        },
        task: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        item: {
          type: String,
          required: true,
        },
      },
    ],
    activities: [{}],
  }
  //   {
  //     typeKey: "$type",
  //   }
);

const UserDatabase = mongoose.model("userdatas", userSchema);

// export default UserDatabase;
module.exports = UserDatabase;
