const Question = require('../models/question');
const User = require('../models/user');

/**
 * Gets all questions, returns a maximum of two documents when @param perPage is not set
 * @param perPage - (optional) for pagination
 * @param page - (optional) for pagination
 * @returns questions - Array and totalItems - Number
*/
exports.getQuestions = async ({ page, perPage }) => {
  const currentPage = parseInt(page, 10) || 1;
  const questionsPerPage = parseInt(perPage, 10) || 2;

  try {
    const totalItems = await Question.find().countDocuments();
    const questions = await Question
      .find()
      .populate({path: 'answers', select:'comment', populate: {path: 'user', select:  'firstname lastname username'}})
      .populate('creator', 'firstname lastname username')
      .skip((currentPage - 1) * questionsPerPage)
      .limit(questionsPerPage);

    if (!questions) {
      const error = new Error('Error occured, could not fetch question.');
      throw error;
    }

    return {
      questions,
      totalItems
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Creates a question and references the user
 * @param title
 * @param content 
 * @param userId
 * @returns question - Object and user - Object
*/
exports.createQuestion = async ({title, content, userId}) => {
  const question = new Question({
    title,
    content,
    creator: userId,
  });
  
  try {
    const result = await question.save();
    const user = await User.findById(userId);
    
    if (!user) {
      const error = new Error('Error occured, could not find user.');
      error.statusCode = 401;
      throw error;
    }
    const creator = user;

    user.questions.push(question);
    await user.save();
  
    if (!result) {
      const error = new Error('Error occured, could not create question.');
      throw error;
    }

    return {
      question: result,
      creator: {
        _id: creator._id,
        name: `${creator.firstname} ${creator.lastname}`
      }
    }
    
  } catch (error) {
    throw error;
  }

}

/**
 * Updates a vote field for a question model
 * @param vote
 * @param questionId
 * @returns vote - Number
*/
exports.voteQuestion = async ({ vote, questionId }) => {
  let voteweight = 0;

  if (vote === 'up') {
    voteweight = 1;
  } else {
    voteweight = -1;
  }

  try {
    const result = await Question.findOne({_id: questionId});
    
    if (!result) {
      const error = new Error('Error occured, could not update vote.');
      throw error;
    }

    if (result.vote === 0 && voteweight === -1) {
      voteweight = 0;
    }
  
    result.vote += voteweight;
  
    result.save();
  
    return result.vote;

  } catch (error) {
    throw error;
  }
}

/**
 * Updates the subscribed field of a question model
 * @param isSubscribed
 * @param questionId 
 * @param userId
 * @returns question - Object
*/
exports.subscribeToQuestion = async ({ isSubscribed, questionId, userId }) => {

  try {
    
    const result = await Question.findOne({_id: questionId});
    
    if (userId.toString() !== result.creator.toString()){
      const error = new Error('User is not authorized to subscribe for this question');
      error.statusCode = 401;
      throw error;
    }
    
    result.isSubscribed = isSubscribed;
  
    result.save();
  
    if (!result) {
      const error = new Error('Error occured, could not subscribe user.');
      throw error;
    }
    
    return result;

  } catch (error) {
    throw error;
  }
}