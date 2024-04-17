require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRoutes = require("./routes/users/users");
const postsRoutes = require("./routes/posts/posts");
const commentsRoutes = require("./routes/comments/comments");
const globalErrHandler = require("./middlewares/golbalHandler");
require("./config/dbConnect");

const app = express();

//middleware
app.use(express.json()); //pass incoming data

//!session config
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: process.env.DATABASE_URL,
      ttl: 24 * 60 * 60,
    }),
  })
);

//!userRoute
app.use("/api/v1/users", userRoutes);

//!posts route
app.use("/api/v1/posts", postsRoutes);

//!comments
app.use("/api/v1/comments", commentsRoutes);

//Error handler middleware
app.use(globalErrHandler);

//listning server
app.listen(process.env.PORT, () => {
  console.log(`Server is Live on port ${process.env.PORT || 9000} `);
});
