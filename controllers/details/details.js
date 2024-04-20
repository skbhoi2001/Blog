const Detail = require("../../models/details/details");
const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

const detailCreateController = async (req, res, next) => {
  try {
    let token = JSON.stringify(req.headers["token"]);
    let auth = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;
    const { title, description, code } = req.body;
    if (!title || !description || !code || !req.file) {
      return next(appErr("All fields are required"));
    }

    const userId = auth;
    const userFound = await User.findById(userId);

    if (!userFound) {
      return next(appErr("Please login"));
    }

    //! get post
    const post = await Post.findById(req.params.id);

    //! create detail

    const detailCreate = await Detail.create({
      title,
      description,
      code,
      image: req.file.path,
      posts: post._id,
      user: userFound._id,
    });

    post.details.push(detailCreate._id);
    userFound.details.push(detailCreate._id);

    //! find user
    const user = await User.findById(auth);

    await post.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    res.json({
      status: "success",
      data: "create Detail",
    });
  } catch (error) {
    console.log("Err");
    next(appErr(error.message));
  }
};

const detailgetByIdController = async (req, res, next) => {
  try {
    const detail = await Detail.findById(req.params.id);

    if (!detail) {
      next(appErr("Invalid Configuration"));
    }
    res.json({
      status: "success",
      data: detail,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const detailEditController = async (req, res, next) => {
  try {
    let token = JSON.stringify(req.headers["token"]);
    let auth = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;
    const { title, description, code } = req.body;
    if (!title || !description || !code || !req.file) {
      return next(appErr("All fields are required"));
    }

    const detail = await Detail.findById(req.params.id);

    if (detail.user.toString() !== auth.toString()) {
      return next(appErr("Not allowed to update", 403));
    }
    const detailUpdate = await Detail.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        code,
        image: req.file.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: detailUpdate,
    });
  } catch (error) {
    console.log("sdjbk");
    next(appErr(error.message));
  }
};

const detailDeleteController = async (req, res, next) => {
  try {
    let token = JSON.stringify(req.headers["token"]);
    let auth = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;
    const detail = await Detail.findById(req.params.id);

    if (detail.user.toString() !== auth.toString()) {
      return next(appErr("Not allowed to update", 403));
    }
    await Detail.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "detail deleted",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  detailCreateController,
  detailgetByIdController,
  detailEditController,
  detailDeleteController,
};
