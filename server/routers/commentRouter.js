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


module.exports = router;
