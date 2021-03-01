import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import multer from "multer";
const upload = multer();
import { multerUploads } from "../middleware/multerUploads.js";

import {
  getDocs,
  addDoc,
  deleteDoc,
  editDoc,
  toggleFav,
} from "../controllers/documents.js";

router.get("/getDocs", getDocs);
router.post("/addDoc", multerUploads.single("file"), addDoc);

// router.delete("/deleteDoc/:id", deleteDoc);

router.patch("/toggleFavourite/:id", toggleFav);

router.delete("/deleteDoc", deleteDoc);

// router.delete("/deleteCard/:id", auth, deleteCard);
router.patch("/editDoc/:id", editDoc);
// router.patch("/toggleFavourite/:id", toggleFav);

export default router;
