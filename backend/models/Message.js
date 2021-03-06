const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  m_sender: {
    type: mongoose.Types.ObjectId,
    ref: 'Account',
  },
  m_dt: {
    type: Date
  },
  g_id: {
    type: mongoose.Types.ObjectId,
    ref: 'ChatGroup'
  },
  msg_string: {
    type: String
  }
});

module.exports = mongoose.model('Message', messageSchema);