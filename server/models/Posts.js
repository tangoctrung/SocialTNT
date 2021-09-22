const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    body: {
        type: String,
        default: '',
    },
    likes: {
        type: Array,
        default: [],
    },
    dislikes: {
        type: Array,
        default: [],
    },
    images: {
        type: Array,
        default: [],
    },
    hashtags: {
        type: Array,
        required: false,
    },
    totalReport: {
        type: Number,
        default: 0,
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comments' }],

}, {timestamps: true})

module.exports = mongoose.model("Post", PostSchema); 