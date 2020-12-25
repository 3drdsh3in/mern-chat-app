const mongoose = require('mongoose');
const Account = require('./Account');

const accountRelationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  acc_id: {
    type: mongoose.type.ObjectId,
    ref: 'Account'
  },
  g_id: {
    type: mongoose.type.ObjectId,
    ref: 'Group'
  }
});

module.exports = mongoose.model('AccountRelation', accountRelationSchema);