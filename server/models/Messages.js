const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({  
    content: {
        type: String,
        default: '',
    },
    conversationId: {
        type: String,
        default: '',
    },
    senderId: {
        type: String,
        default: '',
    }
}, {timestamps: true})

module.exports = mongoose.model("Message", MessageSchema); 