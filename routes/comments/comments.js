const express = require("express");
const {
  createCommentController,
  getAllCommentController,
  getCommentByIdCommentController,
  deleteCommentController,
  updateCommentController,
} = require("../../controllers/comments/comments");
const commentsRoutes = express.Router();

//! create comment
commentsRoutes.post("/", createCommentController);

//! get all comments
commentsRoutes.get("/", getAllCommentController);

//! get comment by id
commentsRoutes.get("/:id", getCommentByIdCommentController);

//! delete comment
commentsRoutes.delete("/:id", deleteCommentController);

//! update comment
commentsRoutes.put("/:id", updateCommentController);

module.exports = commentsRoutes;
