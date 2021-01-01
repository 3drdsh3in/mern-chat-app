const mongoose = require('mongoose');

const chatGroupSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  g_title: {
    type: String,
    unique: false
  },
  g_members: [{
    type: mongoose.Types.ObjectId,
    ref: 'Account'
  }],
  g_type: {
    type: String,
    enum: ['FRIEND', 'GROUP'],
    default: 'FRIEND'
  },
  g_leaders: [{
    type: mongoose.Types.ObjectId,
    ref: 'Account'
  }]
});

module.exports = mongoose.model('ChatGroup', chatGroupSchema);