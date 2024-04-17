const express = require("express");
const {
  createCommentController,
  getAllCommentController,
  getCommentByIdCommentController,
  deleteCommentController,
  updateCommentController,
} = require("../../controllers/comments/comments");
const commentsRoutes = express.Router();
const protected = require("../../middlewares/protected");

//! create comment
commentsRoutes.post("/:id", protected, createCommentController);

//! get all comments
commentsRoutes.get("/", getAllCommentController);

//! get comment by id
commentsRoutes.get("/:id", getCommentByIdCommentController);

//! delete comment
commentsRoutes.delete("/:id", protected, deleteCommentController);

//! update comment
commentsRoutes.put("/:id", protected, updateCommentController);

module.exports = commentsRoutes;
