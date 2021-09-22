const router = require("express").Router();
const Post = require("../models/Posts");
const User = require("../models/Users");

// TẠO MỘT BÀI VIẾT

router.post("/", async (req, res) => {

    const {userId, title, body, images, hashtags} = req.body;
    const newPost = new Post({userId, title, body, images, hashtags});
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LẤY MỘT BÀI VIẾT CÓ ID

router.get("/post/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// LẤY TẤT CẢ BÀI VIẾT CỦA MỘT NGƯỜI DÙNG
router.get("/profile/:id", async (req, res) => {
    try {
      const posts = await Post.find({ userId: req.params.id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// LẤY TẤT CẢ BÀI VIẾT


// LẤY TẤT CẢ BÀI VIẾT CỦA MỘT CHỦ ĐỀ



// LẤY TẤT CẢ BÀI VIẾT LIÊN QUAN ĐẾN NGƯỜI DÙNG HOẶC BẠN BÈ NGƯỜI DÙNG

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// TÌM KIẾM BÀI VIẾT THEO HASHTAG
router.get('/', async (req, res) => {
  const hashtag = req.query.hashtag;
  try{
      const posts = await Post.find({ hashtags : { $all : [hashtag] }});
      res.status(200).json(posts);
  }catch(err){
      res.status(500).json(err);
  }
})


// LIKE POST

router.put("/post/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// DISLIKE POST

router.put("/post/:id/dislike", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.dislikes.includes(req.body.userId)) {
      await post.updateOne({ $push: { dislikes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { dislikes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// COMMENT POST

router.put("/post/:id/comment", async (req, res) => {
  try{

  } catch (err) {
    res.status(500).json(err);
  }


});


module.exports = router;
