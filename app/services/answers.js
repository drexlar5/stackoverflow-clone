const Question = require('../models/question');
const Answer = require('../models/answer');

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

    if (!answer) {
      const error = new Error('Error occured, answer was not created.');
      throw error;
    }
    
    return answer;

  } catch (error) {
    return error;
  }
}