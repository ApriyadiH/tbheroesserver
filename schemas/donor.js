const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  endDate: {
    type: Date
  },
  comment: {
    type: String
  },
  isFinish: {
    type: Boolean,
    required: true
  }
},{
  timestamps:true
})

donorSchema.virtual("donorId").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model('Donors', donorSchema)
