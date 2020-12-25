const mongoose = require('mongoose');

const chatGroupSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  g_title: {
    type: String,
    unique: false
  },
  g_type: {
    type: String,
    enum: ['FRIEND', 'GROUP'],
    default: 'FRIEND'
  }
});

module.exports = mongoose.model('ChatGroup', chatGroupSchema);