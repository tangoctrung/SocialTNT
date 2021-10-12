const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

// CREATE A USER / REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const user1 = await User.findOne({email: req.body.email});
        if (user1) 
            return res.status(400).send({success: false, message: "Email đã được sử dụng"})
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const newUser = await User.findOne({email: req.body.email});
         if (!newUser){
             return res.status(400).json({success: false, message: 'Sai email hoặc mật khẩu.'});  
         } 
        if (!req.body.isLogin) {
            const validate = await bcrypt.compare(req.body.password, newUser.password);
            if (!validate){
                return res.status(400).json({success: false, message: 'Sai email hoặc mật khẩu.'});
            } 
        }

        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json(error);
    }
})

// LOGIN WITH ID
router.post("/loginwithid", async (req, res) => {
    try {
        const newUser = await User.findById({_id: req.body.userId});
        !newUser && res.status(400).json({success: false, message: "Sai email hoặc mật khẩu."});  
        if (!req.body.isLogin) {
            const validate = await bcrypt.compare(req.body.password, newUser.password);
            !validate && res.status(400).json({success: false, message: "Sai email hoặc mật khẩu."});
        }

        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;