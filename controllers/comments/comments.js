const createCommentController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "create comment",
    });
  } catch (error) {
    console.log("create comment", error.message);
  }
};
const getAllCommentController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "getAll comment",
    });
  } catch (error) {
    console.log("getAll comment", error.message);
  }
};
const getCommentByIdCommentController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "getCommentById comment",
    });
  } catch (error) {
    console.log("getCommentById comment", error.message);
  }
};
const deleteCommentController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "delete comment",
    });
  } catch (error) {
    console.log("delete comment", error.message);
  }
};
const updateCommentController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "update comment",
    });
  } catch (error) {
    console.log("update comment", error.message);
  }
};

module.exports = {
  createCommentController,
  getAllCommentController,
  getCommentByIdCommentController,
  deleteCommentController,
  updateCommentController,
};
