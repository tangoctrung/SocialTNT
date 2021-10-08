const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
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
    authorId: {
        // type: Schema.Types.ObjectId,
        type: String,
        ref: 'User',
        required: true,
    },

}, {timestamps: true})

module.exports = mongoose.model("Post", PostSchema); 