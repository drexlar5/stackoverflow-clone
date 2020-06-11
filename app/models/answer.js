const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var answerSchema = Schema({
  question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamp: true
}).index({ comment: 'text' });

module.exports = mongoose.model('Answer', answerSchema);