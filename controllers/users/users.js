const bcrypt = require("bcryptjs");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

const registerController = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  //!if field is empty

  if (!fullname || !email || !password) {
    return next(appErr("Please enter details", 400));
  }

  try {
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
  const { fullname, email } = req.body;
  console.log("1");
  if (email) {
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return next(appErr("Email already taken", 400));
    }
  }

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
  try {
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
    // get login user
    const userId = req.session.userAuth;

    //find user
    const user = await User.findById(userId);

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log("profile", error.message);
  }
};
const userProfilePhotoUploadController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "user userProfilePhotoUpload",
    });
  } catch (error) {
    console.log("userProfilePhotoUpload", error.message);
  }
};
const userCoverPhotoUploadController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "user userCoverPhotoUpload",
    });
  } catch (error) {
    console.log("userCoverPhotoUpload", error.message);
  }
};
const userUpdatePasswordController = async (req, res) => {
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
  try {
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
