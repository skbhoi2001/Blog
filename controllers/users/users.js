const bcrypt = require("bcryptjs");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

const registerController = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    //!if field is empty

    if (!fullname || !email || !password) {
      return next(appErr("Please enter details", 400));
    }
    //! check user exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("user already exists", 400));
    }

    //! hash password

    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password, salt);

    //! register user

    const user = await User.create({
      fullname,
      email,
      password: passwordHashed,
    });

    res.json({
      status: "success",
      user: user,
    });
  } catch (error) {
    console.log("register", error.message);
  }
};
const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(appErr("Please enter details", 400));
  }

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appErr("Invalid Login Data", 400));
    }

    //verify password

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return next(appErr("Invalid passeord", 400));
    }
    //!save the user
    req.session.userAuth = userFound._id;
    console.log(req.session);
    res.json({
      status: "success",
      data: userFound,
      token: req.session.userAuth,
    });
  } catch (error) {
    console.log("login", error.message);
  }
};
const getByIdController = async (req, res) => {
  try {
    //! get user id from params
    const userId = req.params.id;

    const user = await User.findById(userId);

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log("getById", error.message);
  }
};
const userUpdateController = async (req, res, next) => {
  try {
    const { fullname, email } = req.body;
    // if (email) {
    //   const emailTaken = await User.findOne({ email });
    //   if (emailTaken) {
    //     return next(appErr("Email already taken", 400));
    //   }
    // }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullname,
        email,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return next(appErr(`116${error.message}`, 400));
  }
};

const profileController = async (req, res) => {
  try {
    let token = JSON.stringify(req.headers["token"]);
    // get login user
    const userId = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;

    //find user
    const user = await User.findById(userId)
      .populate("posts")
      .populate("comments");

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log("profile", error.message);
  }
};
const userProfilePhotoUploadController = async (req, res, next) => {
  try {
    //! find user
    let token = JSON.stringify(req.headers["token"]);
    let auth = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;

    const userId = auth;
    const userFound = await User.findById(userId);

    if (!userFound) {
      return next(appErr("User not found", 400));
    }

    let profile = await User.findByIdAndUpdate(
      userId,
      {
        profileImage: req.file.path,
      },
      {
        new: true,
      }
    );

    res.json({
      status: "success",
      message: "Profile uploaded",
      data: profile,
    });
  } catch (error) {
    return next(appErr(error.message, 400));
  }
};
const userCoverPhotoUploadController = async (req, res) => {
  try {
    //! find user
    let token = JSON.stringify(req.headers["token"]);
    let auth = token.replace(/^"(.*)"$/, "$1") || req.session.userAuth;

    const userId = auth;
    const userFound = await User.findById(userId);

    if (!userFound) {
      return next(appErr("User not found", 400));
    }

    let coverImage = await User.findByIdAndUpdate(
      userId,
      {
        coverImage: req.file.path,
      },
      {
        new: true,
      }
    );

    res.json({
      status: "success",
      message: "Cover uploaded",
      data: coverImage,
    });
  } catch (error) {
    return next(appErr(error.message, 400));
  }
};
const userUpdatePasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user updating passowrd
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const passwordHashed = bcrypt.hashSync(password, salt);

      await User.findByIdAndUpdate(
        req.params.id,
        {
          password: passwordHashed,
        },
        {
          new: true,
        }
      );
    }
    res.json({
      status: "success",
      user: "password updated successfully",
    });
  } catch (error) {
    return next(appErr(`179${error.message}`, 400));
  }
};
const userLogoutController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "user userLogout",
    });
  } catch (error) {
    console.log("userLogout", error.message);
  }
};

module.exports = {
  registerController,
  loginController,
  getByIdController,
  userUpdateController,
  profileController,
  userProfilePhotoUploadController,
  userCoverPhotoUploadController,
  userUpdatePasswordController,
  userLogoutController,
};
