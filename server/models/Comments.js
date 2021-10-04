const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    writerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // type: String,
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

}, {timestamps: true})

module.exports = mongoose.model("Comment",CommentsSchema);