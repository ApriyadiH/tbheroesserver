const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
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

chatSchema.virtual("chatId").get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Chats', chatSchema)
