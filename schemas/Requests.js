const mongoose = require('mongoose');

const requestsSchema = new mongoose.Schema({
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

requestsSchema.virtual("requestId").get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Requests', requestsSchema)