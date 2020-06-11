const Question = require('../models/question');
const Answer =  require('../models/answer');
const User = require('../models/user');

/**
 * Performs partial text search on question model
 * @param queryString
 * @param page - (optional) for pagination
 * @param perPage - (optional) for pagination
 * @returns questions - Array
*/
exports.searchQuestion = async ({ queryString, page, perPage }) => {
  const currentPage = parseInt(page, 10) || 1;
  const questionsPerPage = parseInt(perPage, 10) || 2;

  try {
   const query = {
      $or: [
        { title: {
          $regex: queryString,
          '$options': 'i'
          }
        },
        { content: {
          $regex: queryString,
          '$options': 'i'
          }
        }
      ]
    };

    const questions = await Question
      .find(query)
      .skip((currentPage - 1) * questionsPerPage)
      .limit(questionsPerPage);

    if (questions.size == 0){
      return null;
    }
    
    return questions;
    
  } catch (error) {
    return error;
  }
   
}

/**
 * Performs partial text search on answer model
 * @param queryString
 * @param page - (optional) for pagination
 * @param perPage - (optional) for pagination
 * @returns answers - Array
*/
exports.searchAnswer = async ({ queryString, page, perPage }) => {
  const currentPage = parseInt(page, 10) || 1;
  const answersPerPage = parseInt(perPage, 10) || 2;

  try {
    const query = {
      'comment': {
        $regex: queryString,
        '$options': 'i'
      }
    };

    const answers = await Answer
      .find(query)
      .skip((currentPage - 1) * answersPerPage)
      .limit(answersPerPage);
  
    if (answers.size == 0){
      return null;
    }
    
    return answers;
    
  } catch (error) {
    return error;
  }
   
}

/**
 * Performs partial text search on user model
 * @param queryString
 * @param page - (optional) for pagination
 * @param perPage - (optional) for pagination
 * @returns users - Array
*/
exports.searchUser = async ({ queryString, page, perPage }) => {
  const currentPage = parseInt(page, 10) || 1;
  const usersPerPage = parseInt(perPage, 10) || 2;

  try {
    const query = {
      $or: [
        { username: {
          $regex: queryString,
          '$options': 'i'
          }
        },
        { firstname: {
          $regex: queryString,
          '$options': 'i'
          }
        },
        { lastname: {
          $regex: queryString,
          '$options': 'i'
          }
        },
        { email: {
          $regex: queryString,
          '$options': 'i'
          }
        }
      ]
    };

    const users = await User
      .find(query)
      .skip((currentPage - 1) * usersPerPage)
      .limit(usersPerPage);
  
    if (users.size == 0){
      return null;
    }
    
    return users;
    
  } catch (error) {
    return error;
  }
   
}