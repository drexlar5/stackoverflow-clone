const { validationResult } = require('express-validator');
const QuestionService = require('../services/questions');

exports.getQuestions = async (req, res, next) => {
  const { page, perPage } = req.query;

  try {
    const result = await QuestionService.getQuestions({ page, perPage });
   
    res.status(200).json({
      message: 'Questions fetched successfully',
      data: result.questions,
      total: result.totalItems
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createQuestion = async (req, res, next) => {
  const errors = validationResult(req);
  
  try {

    if(!errors.isEmpty){
      const error = new Error('Valicatin failed, data entered is incorrect.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { title, content } = req.body;
    const userId = req.userId;

    const question = await QuestionService.createQuestion({title, content, userId});

    res.status(201).json({
      message: 'Question created successfully',
      data: question
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.voteQuestion = async (req, res, next) => {

  const { vote, questionId } = req.body;
  const userId = req.userId;

  try {
    const result = await QuestionService.voteQuestion({ vote, questionId });

    res.status(201).json({
      message: 'Vote updated successfully',
      data: result
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};