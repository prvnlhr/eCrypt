// import mongoose from "mongoose";
const mongoose = require("mongoose");
const crypto = require("crypto");
const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timeStamp: true }
  //   {
  //     typeKey: "$type",
  //   }
);

//Virtual Password ==> virtual is used in mongodb to to not store in db read documentation for more
authSchema
  .virtual("password")
  .set(function (password) {
    // this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this.password;
  });

authSchema.methods = {
  //generate salt
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
  //Encrypt Password
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  isMatched: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },
};

const authDatabase = mongoose.model("authdata", authSchema);

// export default UserDatabase;
module.exports = authDatabase;
