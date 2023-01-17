const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    location: {
        type: Array,
        required: true
    },
    bloodType: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
},{
    timestamps:true
})

requestSchema.virtual("requestId").get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Requests', requestSchema)