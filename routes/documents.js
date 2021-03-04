const express = require("express");
const router = express.Router();
const multerUploads = require("../middleware/multerUploads");
const documentsController = require("../controllers/documents");

router.get("/getDocs", documentsController.getDocs);
router.post(
  "/addDoc",
  multerUploads.single("file"),
  documentsController.addDoc
);


router.patch("/toggleFavourite/:id", documentsController.toggleFav);

router.delete("/deleteDoc/:id", documentsController.deleteDoc);

router.patch("/editDoc/:id", documentsController.editDoc);
module.exports = router;
