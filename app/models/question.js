const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  vote: {
    type: Number,
    default: 0
  },
  answersCount: {
    type: Number,
    default: 0
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
}, {
  timestamps: true
});

questionSchema.index({ title: 'text', content: 'text' })

module.exports = mongoose.model('Question', questionSchema);