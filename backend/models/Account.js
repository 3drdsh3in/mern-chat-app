const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  acc_usrname: {
    type: String,
    required: true,
  },
  acc_email: {
    type: String,
    required: true,
  },
  acc_password: {
    type: String,
    required: true,
  },
  acc_dob: {
    type: Date,
    required: true,
  },
  acc_gender: {
    type: Date,
    required: true,
  },
  acc_fname: {
    type: String,
    required: true,
  },
  acc_lname: {
    type: String,
    required: true,
  },
  acc_img: {
    type: String,
    required: true,
  },
  acc_bio: {
    type: String
  },
  // tasks: [{
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Task'
  // }],
  // students: [{
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Student'
  // }],
  totalTime: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Account', accountSchema);