const mongoose = require('mongoose');

const chatsSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    chat: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})

chatsSchema.virtual("chatId").get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Chats', chatsSchema)