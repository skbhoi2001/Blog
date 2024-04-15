const postCreateController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "post Create",
    });
  } catch (error) {
    console.log("post Create", error.message);
  }
};
const postGetController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "post Get",
    });
  } catch (error) {
    console.log("post Get", error.message);
  }
};
const postGetByIdController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "post GetById",
    });
  } catch (error) {
    console.log("post GetById", error.message);
  }
};
const postDeleteController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "post Delete",
    });
  } catch (error) {
    console.log("post Delete", error.message);
  }
};
const postUpdateController = async (req, res) => {
  try {
    res.json({
      status: "success",
      user: "post Update",
    });
  } catch (error) {
    console.log("post Update", error.message);
  }
};

module.exports = {
  postCreateController,
  postGetController,
  postGetByIdController,
  postDeleteController,
  postUpdateController,
};
