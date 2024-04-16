const express = require("express");
const multer = require("multer");

const {
  postCreateController,
  postGetController,
  postGetByIdController,
  postDeleteController,
  postUpdateController,
} = require("../../controllers/posts/posts");
const postsRoutes = express.Router();
const protected = require("../../middlewares/protected");
const storage = require("../../config/cloudnary");

//! instances of multers
const upload = multer({
  storage,
});

//! create post
postsRoutes.post("/", protected, upload.single("file"), postCreateController);

//! get all post
postsRoutes.get("/", postGetController);

//!get post by id
postsRoutes.get("/:id", postGetByIdController);

//! delete post
postsRoutes.delete("/:id", protected, postDeleteController);

//!update post
postsRoutes.put("/:id", protected, upload.single("file"), postUpdateController);

module.exports = postsRoutes;
