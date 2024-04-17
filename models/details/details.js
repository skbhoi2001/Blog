const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  code: {
    type: String,
  },
  image: {
    type: String,
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Detail = mongoose.model("Detail", detailSchema);

module.exports = Detail;
