const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: "",
    },
    cover: {
        type: String,
        required: false,
        default: "",
    },
    nickname: {
        type: String,
        required: false,
        default: "",
    },
    date: {
        type: String,
        required: false,
        default: "",
    },
    job: {
        type: String,
        required: false,
        default: "",
    },
    status: {
        type: String,
        required: false,
        default: "",
    },
    address: {
        type: String,
        required: false,
        default: "",
    },
    hometown: {
        type: String,
        required: false,
    },
    infoOther: {
        type: String,
        required: false,
        default: "",
    },
    follower: {
        type: Array,
        required: false,
        default: [],
    },
    following: {
        type: Array,
        required: false,
        default: [],
    },
    gender: {
        type: String,
        required: false,
        default: "",
    },
    searchHistorys: {
        type: Array,
        required: false,
    },
    postSaved: {
        type: Array,
        default: [],
    }

}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);