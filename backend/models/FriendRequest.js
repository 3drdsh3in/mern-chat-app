const mongoose = require('mongoose');

// Keep Schema In case you can be bothered to implement UI for inputting message into Friend Requests.
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
  // fr_msg: {
  //   type: String,
  //   max: 20
  // },
});

module.exports = mongoose.model('FriendRequest', friendRequestSchema);