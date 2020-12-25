const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fr_sender_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account'
  },
  fr_reciever_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account'
  },
  fr_state: {
    type: String,
    enum: ['PENDING', 'ACCEPTED'],
    default: 'PENDING'
  },
  fr_msg: {
    type: String,
    max: 20
  },
});

module.exports = mongoose.model('FriendRequest', friendRequestSchema);