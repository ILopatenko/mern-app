const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a NAME!'],
    },
    email: {
      type: String,
      required: [true, 'Please add a EMAIL!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a PASSWORD!'],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);
