const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
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

module.exports = mongoose.model('ModelName', modelSchema);