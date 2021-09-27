const mongoose = require('mongoose');


const ConversationSchema = new mongoose.Schema({
    
    members: {
        type: Array,
        default: [],
    },
    messageLast: {
        type: String,
        default: '',
    },
    senderId: {
        type: String,
        default: '',
    }

}, {timestamps: true})

module.exports = mongoose.model("Conversation", ConversationSchema); 