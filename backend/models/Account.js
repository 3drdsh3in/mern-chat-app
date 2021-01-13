const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  acc_usrname: {
    type: String,
    required: true,
    unique: true
  },
  acc_email: {
    type: String,
    required: true,
    unique: true
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
    type: String,
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
  acc_bio: {
    type: String
  },
  acc_friends: [{
    type: mongoose.Types.ObjectId,
    ref: 'Account'
  }],
  acc_freqs: [{
    type: mongoose.Types.ObjectId,
    ref: 'FriendRequest'
  }],
  acc_grps: [{
    type: mongoose.Types.ObjectId,
    ref: 'ChatGroup'
  }],
  acc_theme: {
    type: String,
    required: true,
    min: 6,
    max: 6
  }
});

module.exports = mongoose.model('Account', accountSchema);