const mongoose = require('mongoose');


const CommentsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: '',
    },
    likes: {
        type: Array,
        default: [],
    },
    totalReport: {
        type: Array,
        default: [],
    },
    replyComment: {
        type: Array,
        default: [],
    }

}, {timestamps: true})

module.exports = mongoose.model("Comment",CommentsSchema);