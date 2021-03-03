// import express from "express";
const express = require("express");
const router = express.Router();
// import auth from "../middleware/auth.js";
// import multer from "multer";
// const upload = multer();

// import { multerUploads } from "../middleware/multerUploads.js";
const multerUploads = require("../middleware/multerUploads");

// import {
//   getDocs,
//   addDoc,
//   deleteDoc,
//   editDoc,
//   toggleFav,
// } from "../controllers/documents.js";
const documentsController = require("../controllers/documents");

router.get("/getDocs", documentsController.getDocs);
router.post(
  "/addDoc",
  multerUploads.single("file"),
  documentsController.addDoc
);

// router.delete("/deleteDoc/:id", deleteDoc);

router.patch("/toggleFavourite/:id", documentsController.toggleFav);

router.delete("/deleteDoc/:id", documentsController.deleteDoc);

// router.delete("/deleteCard/:id", auth, deleteCard);
router.patch("/editDoc/:id", documentsController.editDoc);
// router.patch("/toggleFavourite/:id", toggleFav);

// export default router;
module.exports = router;
