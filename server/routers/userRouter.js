const router = require("express").Router();
const User = require("../models/Users");


// TÌM KIẾM NGƯỜI DÙNG THEO USERNAME OR EMAIL
router.get('/', async (req, res) => {
  const username = req.query.username;
  let userArray = [];
  try {
      const users = await User.find();
      users.map(user => {
           if (user.username.toLowerCase().includes(username.toLowerCase())) {
               userArray.push(user);
           }
      })
      res.status(200).json(userArray);
  } catch (err) {
      res.status(500).json(err);
  }
  
})


// GET A USER
router.get("/profile/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USER
router.get("/alluser", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE INFO A USER
router.put("/profile/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET FOLLOWERS

router.get("/profile/followers/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.follower.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, avatar } = friend;
      friendList.push({ _id, username, avatar });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET FOLLOWINGS

router.get("/profile/followings/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, avatar } = friend;
      friendList.push({ _id, username, avatar });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});


//FOLLOW A USER

router.put("/profile/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.follower.includes(req.body.userId)) {
        await user.updateOne({ $push: { follower: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

// UNFOLLOWING A USER

router.put("/profile/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.follower.includes(req.body.userId)) {
        await user.updateOne({ $pull: { follower: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

// ADD SEARCH HISTORY FOR USER

router.put("/addSearchHistory", async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);   
        const history = await currentUser.updateOne({ $push: { searchHistorys: req.body.history } });
        res.status(200).json(history);   
    } catch (err) {
      res.status(500).json(err);
    }
});

// DELETE SEARCH HISTORY FOR USER

router.put("/deleteSearchHistory", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);   
      const history = await currentUser.updateOne({ $pull: { searchHistorys: req.body.history } });
      res.status(200).json(history);   
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
