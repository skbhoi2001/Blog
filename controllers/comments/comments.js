const Comment = require("../../models/comment/Comment");
const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

const createCommentController = async (req, res, next) => {
  let token = JSON.stringify(req.headers["token"]);
  let auth = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;
  const { message } = req.body;

  if (!message) {
    return next(appErr("Please enter message"));
  }

  //!find post
  const post = await Post.findById(req.params.id);

  //! create comments
  const comment = await Comment.create({
    user: auth,
    message,
  });

  //! push to the post
  post.comments.push(comment._id);

  //! find user
  const user = await User.findById(auth);

  //! push the comment to user
  user.comments.push(comment._id);

  //! disable validation to save user and post
  await post.save({ validateBeforeSave: false });
  await user.save({ validateBeforeSave: false });

  try {
    res.json({
      status: "success",
      data: "create comment",
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};
const getAllCommentController = async (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "comment submitted",
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};
const getCommentByIdCommentController = async (req, res, next) => {
  try {
    res.json({
      status: "success",
      user: "getCommentById comment",
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};
const deleteCommentController = async (req, res, next) => {
  let token = JSON.stringify(req.headers["token"]);
  let auth = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;
  try {
    //! found comment
    const comment = await Comment.findById(req.params.id);

    //! check if the comment belong to the user
    if (comment.user.toString() !== auth.toString()) {
      return next(appErr("Not allowed to delete", 403));
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      user: "delete comment",
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};
const updateCommentController = async (req, res, next) => {
  const { message } = req.body;
  let token = JSON.stringify(req.headers["token"]);
  let auth = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;

  if (!message) {
    return next(appErr("All fields are required"));
  }

  //! found comment
  const comment = await Comment.findById(req.params.id);

  //! check comment exists
  if (!comment) {
    return next(appErr("Comment soesnot exists", 403));
  }

  //! check if the comment belong to the user
  if (comment.user.toString() !== auth.toString()) {
    return next(appErr("Not allowed to Update", 403));
  }

  const commentUpdate = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      message: message,
    },
    {
      new: true,
    }
  );

  try {
    res.json({
      status: "success",
      data: commentUpdate,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

module.exports = {
  createCommentController,
  getAllCommentController,
  getCommentByIdCommentController,
  deleteCommentController,
  updateCommentController,
};
