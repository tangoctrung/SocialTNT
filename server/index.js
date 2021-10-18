const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const authRouter = require("./routers/authRouter");
const commentRouter = require("./routers/commentRouter");
const replyCommentRouter = require("./routers/replyCommentRouter");
const messageRouter = require("./routers/messageRouter");
const conversationRouter = require("./routers/conversationRouter");
const messageGroupRouter = require("./routers/messageGroupRouter");
const conversationGroupRouter = require("./routers/conversationGroupRouter");
const notificationRouter = require("./routers/notificationRouter");
const multer = require("multer");

const app = express();

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// mongodb+srv://tntrung:tnkg23072001@socialtnt.gv0dj.mongodb.net/SocialTNT?retryWrites=true&w=majority
// connect to the database
mongoose
  .connect("mongodb://localhost:27017/SocialTNT", {
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
app.use("/api/replycomment", replyCommentRouter);
app.use("/api/messages", messageRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messagesgroup", messageGroupRouter);
app.use("/api/conversationsgroup", conversationGroupRouter);
app.use("/api/notifications", notificationRouter);

const PORT = process.env.PORT || 8800;
app.listen(8800, () => {
  console.log("server is running on port 8800");
});
