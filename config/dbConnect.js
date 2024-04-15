const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB connected");
  } catch (error) {
    console.log("DB Error", error.message);
  }
};

dbConnect();
//!soumyak.bhoi.2001
