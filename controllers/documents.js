const UserDatabase = require("../models/userData");
const cloudinary = require("../utils/cloudinaryConfig");
const documentsController = {
  getDocs: async (req, res) => {
    try {
      const response = await UserDatabase.findOne({ _id: req.query.user_id });
      res.status(200).send(response.docsArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  addDoc: async (req, res) => {
    // console.log("add doc cntrl", req.body);
    const id = req.body.userId;
    const fileName = req.body.name;
    const filePath = req.file.path;

    try {
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(filePath, {
        folder: "eCrypt",
      });
      console.log("cldnr resounse", cloudinaryResponse);
      const docData = {
        imageName: fileName,
        imageUrl: cloudinaryResponse.secure_url,
        cloudinary_id: cloudinaryResponse.public_id,
      };
      // console.log("cloudinaryResponseAdd", cloudinaryResponse);
      const dBResponse = await UserDatabase.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            docsArray: docData,
          },
        },
        { returnOriginal: false }
      );
      // console.log("mongodbResponseAdd", dBResponse.docsArray);

      res.status(200).json(dBResponse.docsArray);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  },
  deleteDoc: async (req, res) => {
    console.log("deleteDoc controller", req.body);
    const cloudId = req.body.cloudId;
    const userId = req.body.userId;
    const docId = req.params.id;

    try {
      const result = await cloudinary.v2.uploader.destroy(cloudId);
      const response = await UserDatabase.findOneAndUpdate(
        { _id: userId },
        {
          $pull: {
            docsArray: {
              _id: docId,
            },
          },
        },
        { returnOriginal: false }
      );
      // console.log(response);
      res.status(200).send({
        data: response.docsArray,
        msg: "docDeleted",
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  editDoc: async (req, res) => {
    const id = req.params.id;
    console.log("at edit doc controller", req.body);
    const { imageName } = req.body;
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { "docsArray._id": id },
        {
          $set: {
            "docsArray.$.imageName": imageName,
          },
        },
        { returnOriginal: false }
      );
      res.status(201).json(response.docsArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  toggleFav: async (req, res) => {
    const id = req.params.id;
    const isFav = req.body.data;
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { "docsArray._id": id },
        {
          $set: {
            "docsArray.$.isFavourite": isFav,
          },
        },
        { returnOriginal: false }
      );
      res.status(201).json(response.docsArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = documentsController;
