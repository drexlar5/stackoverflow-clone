const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', [
  body('email')
  .isEmail()
  .withMessage('Please enter a valid email address')
  .custom((value, {req}) => {
    return User.findOne({email: value})
    .then(userDoc => {
      if ( userDoc ) {
        return Promise.reject('Email address already exists');
      }
      return true;
    })
  })
  .normalizeEmail(),
  body('password').trim().isLength({min: 5}),
  body('firstname').trim().isString().not().isEmpty(),
  body('lastname').trim().isString().not().isEmpty(),
  body('username').trim().isString().not().isEmpty()
], authController.signup);

router.post('/login', [
  body('email')
  .isEmail()
  .withMessage('Please enter a valid email address')
  .normalizeEmail(),
  body('password').trim().isLength({min: 5})
], authController.login);

module.exports = router;