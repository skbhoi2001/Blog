const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

const postCreateController = async (req, res, next) => {
  try {
    let token = JSON.stringify(req.headers["token"]);
    let auth = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;
    const { title, description, category } = req.body;
    if (!title || !description || !category || !req.file) {
      return next(appErr("All fields are required"));
    }

    //! find user
    const userId = auth;
    const userFound = await User.findById(userId);

    //! create post

    const postCreated = await Post.create({
      title,
      description,
      category,
      image: req.file.path,
      user: userFound._id,
    });

    //! push the post created to array of user posts
    userFound.posts.push(postCreated._id);

    //resave the user

    await userFound.save();

    res.json({
      status: "success",
      user: "post Create",
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};
const postGetController = async (req, res, next) => {
  const posts = await Post.find().populate("comments");

  try {
    res.json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};
const postGetByIdController = async (req, res, next) => {
  //! get the id
  const id = req.params.id;

  //! find the post
  const post = await Post.findById(id).populate("comments").populate("details");

  try {
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};
const postDeleteController = async (req, res, next) => {
  try {
    let token = JSON.stringify(req.headers["token"]);
    let auth = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;
    //! found post
    const post = await Post.findById(req.params.id);

    //! check if the post belong to the user
    if (post.user.toString() !== auth.toString()) {
      return next(appErr("Not allowed to delete", 403));
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "post deleted",
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};
const postUpdateController = async (req, res, next) => {
  try {
    let token = JSON.stringify(req.headers["token"]);
    let auth = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;
    const { title, description, category } = req.body;

    if (!title || !description || !category || !req.file) {
      return next(appErr("All fields are required"));
    }

    //! found post
    const post = await Post.findById(req.params.id);

    //! check if the post belong to the user
    if (post.user.toString() !== auth.toString()) {
      return next(appErr("Not allowed to delete", 403));
    }

    const postUpdate = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        image: req.file.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: postUpdate,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

module.exports = {
  postCreateController,
  postGetController,
  postGetByIdController,
  postDeleteController,
  postUpdateController,
};
