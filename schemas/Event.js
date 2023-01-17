const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
},{
  timestamps:true
})

eventSchema.virtual("EventId").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model('Events', eventSchema)