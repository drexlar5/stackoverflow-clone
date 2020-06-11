const Question = require('../models/question');
const Answer = require('../models/answer');
const socketIO = require('../../socket');

exports.postAnswer = async ({ questionId, userId, comment}) => {

  try {

    const question = await Question.findById(questionId);
  
    var answer = new Answer({
      question: questionId,
      user: userId,
      comment,
    });
  
    answer.save();

    question.answers.push(answer._id);
    question.answersCount++; 

    question.save();

    if (question.isSubscribed) {
      socketIO.getIO().emit(questionId, {
        message: 'Your question has been answered',
        data: {
          answer: answer.comment
        }
      })
    }

    if (!answer) {
      const error = new Error('Error occured, answer was not created.');
      throw error;
    }
    
    return answer;

  } catch (error) {
    return error;
  }
}