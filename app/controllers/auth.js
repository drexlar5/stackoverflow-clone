const { validationResult } = require('express-validator');
const UserService = require('../services/auth');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  
  try {

    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const user = await UserService.signup(req.body)
  
    res.status(201).json({
      message: 'User created',
      data: user
    });
    
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }



};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  
  try {

    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const user = await UserService.login(req.body)
  
    res.status(201).json({
      message: 'User authenticated',
      data: user
    });
  
  } catch (error) {
    console.log('entered here', error)
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}