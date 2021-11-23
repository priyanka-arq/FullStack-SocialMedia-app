const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const dbConfig = require("./app/config");
const morgan = require("morgan");
const userRoute = require("./app/routes/users.js");
const authRoute = require("./app/routes/auth");
const postRoute = require("./app/routes/posts");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const passportSetup = require("./passport");
const multer = require("multer");
const path = require("path");
const conversationRoute = require("./app/routes/conversations");
const messageRoute = require("./app/routes/messages");

dotenv.config();
mongoose
  .connect(
    `mongodb+srv://priyanka:${process.env.MONGODB_PASSWORD}@${dbConfig.HOST}/${dbConfig.DB}?retryWrites=true&w=majority`
  )
  .then(() => console.log("DBConnection Successful"))
  .catch((err) => {
    console.log(err);
  });

//if any get request comes to path "/images" then go to directory name "public/images"
//user require("path")
app.use("/images", express.static(path.join(__dirname, "public/images")));

//MIDDLEWARES
//its body parser, any post request is parsed
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//USE MULTER to UPLOAD FILES
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SECTRET_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
//ROUTES
app.use("/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
