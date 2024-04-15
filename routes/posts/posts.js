const express = require("express");
const {
  postCreateController,
  postGetController,
  postGetByIdController,
  postDeleteController,
  postUpdateController,
} = require("../../controllers/posts/posts");
const postsRoutes = express.Router();

//! create post
postsRoutes.post("/", postCreateController);

//! get all post
postsRoutes.get("/", postGetController);

//!get post by id
postsRoutes.get("/:id", postGetByIdController);

//! delete post
postsRoutes.delete("/:id", postDeleteController);

//!update post
postsRoutes.put("/:id", postUpdateController);

module.exports = postsRoutes;
