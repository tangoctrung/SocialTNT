const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const authRouter = require("./routers/authRouter");
const commentRouter = require("./routers/commentRouter");
const multer = require("multer");

const app = express();

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// connect to the database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log("Connect to MongDB"))
  .catch((err) => console.error(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comment", commentRouter);

app.listen(8801, () => {
  console.log("server is running on port 8801");
});