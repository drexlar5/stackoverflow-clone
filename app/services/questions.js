const Question = require('../models/question');
const User = require('../models/user');


exports.getQuestions = async ({ page, perPage }) => {
  const currentPage = parseInt(page, 10) || 1;
  const questionsPerPage = parseInt(perPage, 10) || 2;

  try {
    const totalItems = await Question.find().countDocuments();
    const questions = await Question
      .find()
      .populate('answers')
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
    return error;
  }
}

exports.createQuestion = async ({title, content, userId}) => {
  const question = new Question({
    title,
    content,
    creator: userId,
  });
  
  try {
    const result = await question.save();
    const user = await User.findById(userId);
    const creator = user;

    user.questions.push(question);
    await user.save();
  
    if (!result) {
      const error = new Error('Error occured, could not create question.');
      throw error;
    }

    return {
      result,
      creator: {
        _id: creator._id,
        name: `${creator.firstname} ${creator.lastname}`
      }
    }
    
  } catch (error) {
    return error;
  }

}

exports.voteQuestion = async ({ vote, questionId }) => {
  let voteweight = 0;

  if (vote === 'up') {
    voteweight = 1;
  } else {
    voteweight = -1;
  }

  console.log(questionId, 'vote', vote)
  try {
    const result = await Question.findOne({_id: questionId});
  
    if (result.vote === 0 && voteweight === -1) {
      voteweight = 0;
    }
  
    result.vote += voteweight;
  
    result.save();
  
    console.log(result)
    if (!result) {
      const error = new Error('Error occured, could not update vote.');
      throw error;
    }
    
    return result.vote;

  } catch (error) {
    return error;
  }


}