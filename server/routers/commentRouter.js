const router = require("express").Router();
const Comment = require("../models/Comments");

// CREATE COMMENT

router.post("/", async (req, res) => {
    const {userId, postId, content} = req.body;
    const newComment = new Comment({userId, postId, content});
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});


// GET ALL COMMENT OF POST

router.get("/post/:id", async (req, res) => {
    const postId = req.params.id;
    try {
        const comments = await Comment.find({postId: postId});
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
})

// LIKE/UNLIKE COMMENT
router.put("/likecomment", async (req, res) => {
    try {
      const comment = await Comment.findById(req.body.commentId);
      if (!comment.likes.includes(req.body.userId)) {
        await comment.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The comment has been like");
      } else {
        await comment.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The comment has been unlike");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
