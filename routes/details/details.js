const express = require("express");
const multer = require("multer");

const {
  detailCreateController,
  detailgetByIdController,
  detailEditController,
  detailDeleteController,
} = require("../../controllers/details/details");
const protected = require("../../middlewares/protected");
const storage = require("../../config/cloudnary");

const detailRoutes = express.Router();

//! instances of multers
const upload = multer({
  storage,
});

detailRoutes.post(
  "/:id",
  protected,
  upload.single("image"),
  detailCreateController
);
detailRoutes.get("/:id", protected, detailgetByIdController);
detailRoutes.put(
  "/:id",
  protected,
  upload.single("image"),
  detailEditController
);
detailRoutes.delete("/:id", protected, detailDeleteController);

module.exports = detailRoutes;
