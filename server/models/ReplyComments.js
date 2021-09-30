const mongoose = require('mongoose');


const ReplyCommentsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    commentId: {
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


}, {timestamps: true})

module.exports = mongoose.model("ReplyComment", ReplyCommentsSchema);