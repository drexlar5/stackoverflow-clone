const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtsecret = require('../config/config').secret;

const User = require('../models/user');

/**
 * Registers a user
 * @param email
 * @param firstname 
 * @param lastname
 * @param username 
 * @param password
 * @returns userId - String
*/
exports.signup = async ({ email, firstname, lastname, username, password }) => {
 
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      firstname,
      lastname,
      username,
      password: hashedPassword
    });
  
    const result = await user.save();

    if (!result) {
      const error = new Error('Error occured, user was not created.');
      throw error;
    }

    return result._id;

  } catch (error) {
    return error;
  }
}

/**
 * Authenticates a user
 * @param email
 * @param password
 * @returns user token - Object
*/
exports.login = async ({ email, password }) => {

  try {
    const user = await User.findOne({email: email})
  
    if (!user) {
      const error = new Error('User does not exist.');
      error.statusCode = 401;
      throw error;
    }

    const loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual){
      const error = new Error('Wrong password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({
      email: loadedUser.email, 
      userId: loadedUser._id.toString()
    }, jwtsecret, {
      expiresIn: '1h'
    } );

    if (!token) {
      const error = new Error('Error occured, could not create token.');
      throw error;
    }

    return {
      token,
      userId: loadedUser._id.toString()
    };
    
  } catch (error) {
    console.log('this error', error)
    throw error;
  }

}