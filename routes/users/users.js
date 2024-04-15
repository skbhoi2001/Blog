const express = require("express");
const {
  registerController,
  loginController,
  getByIdController,
  profileController,
  userProfilePhotoUploadController,
  userCoverPhotoUploadController,
  userUpdatePasswordController,
  userLogoutController,
  userUpdateController,
} = require("../../controllers/users/users");
const protected = require("../../middlewares/protected");
const userRoutes = express.Router();

//! register
userRoutes.post("/register", registerController);

//! login
userRoutes.post("/login", loginController);

//! user profile
userRoutes.get("/profile", protected, profileController);

//! update user
userRoutes.put("/update/:id", userUpdateController);

//! profile photo upload
userRoutes.put("/profile-photo-upload/:id", userProfilePhotoUploadController);

//! cover photo upload
userRoutes.put("/cover-photo-upload/:id", userCoverPhotoUploadController);

//! get user by id
userRoutes.get("/:id", getByIdController);

//! update password
userRoutes.put("/update-password/:id", userUpdatePasswordController);

//! logout
userRoutes.post("/logout", userLogoutController);

module.exports = userRoutes;
