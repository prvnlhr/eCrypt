import UserDatabase from "../models/userData.js";
import cloudinary from "cloudinary";
import { configCloud } from "../utils/cloudinaryConfig.js";
import { multerUploads } from "../middleware/multerUploads.js";
//GET ALL DOCS
export const getDocs = async (req, res) => {
  try {
    const response = await UserDatabase.findOne({ _id: req.query.user_id });
    res.status(200).send(response.docsArray);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//ADD NEW DOC
export const addDoc = async (req, res) => {
  // console.log("add Doc");
  const id = req.body.userId;
  const fileName = req.body.name;
  const filePath = req.file.path;

  try {
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(filePath, {
      folder: "eCrypt",
    });

    const docData = {
      imageName: fileName,
      imageUrl: cloudinaryResponse.url,
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
};
//DELETE DOC
export const deleteDoc = async (req, res) => {
  const cloudId = req.body.cloudId;
  const userId = req.body.userId;
  const docId = req.body.docId;
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
    res.status(200).send(response.docsArray);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editDoc = async (req, res) => {
  const id = req.params.id;
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
};

export const toggleFav = async (req, res) => {
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
};

// ____________________________________
// const result = await cloudinary.v2.uploader.destroy(
//   "rrko5mzn90befa5ef65i",
//   (error, res) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(res);
//     }
//   }
// );
//______________________________________________

// const docData = req.body.docData

// for (var pair of docData.entries()) {
//   console.log(pair[0] + ", " + pair[1]);
// }
// const url = req.body.docUrl;
// const title = req.body.docTitle;
// const id = req.body.user_id;
// const cloud_id = req.body.cloudinaryId;
// console.log(req.body);

// const docData = {
//   imageName: title,
//   imageUrl: url,
//   cloudinary_id: cloud_id,
// };

// console.log(url, title, id, docData);

// cloudinary.v2.uploader.upload(
//   req.body,
//   { folder: "eCrypt" },
//   async (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//     console.log("cdnResponse", result);
//   }
// );

// console.log("cdn response", response);

// const response = await UserDatabase.findOneAndUpdate(
//   { _id: id },
//   // { _id: "600d82bf9845131bacfd102e" },
//   {
//     $push: {
//       docsArray: docData,
//       // cardsArray: req.body,
//     },
//   },
//   { returnOriginal: false }
// );
// console.log("addDocsREsponse", response.docsArray);
// res.status(200).send(response.docsArray);
