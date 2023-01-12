const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  bloodType: {
    type: String
  },
  location: {
    type: Array
  },
  status: {
    type: String,
    required: true
  }
},{
  timestamps:true
})

usersSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model('Users', usersSchema)