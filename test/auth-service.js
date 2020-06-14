const expect = require('chai').expect;
const sinon = require('sinon');
const bcrypt = require('bcryptjs');

const db = require('../app/database/mongoose');
const User = require('../app/models/user');
const AuthService = require('../app/services/auth');

describe('Auth Service', function() {
  before((done) => {
    db.testConnection()
    .then(result => {
    })
    .then(() => {
      done();
    });
  });

  describe('Signup', function() {
    const data = {
      email: 'test@test.com',
      firstname: 'Michael',
      lastname: 'Agboola',
      username: 'devguy',
      password: 'testpassword',
      _id: '5ee414b6f74b2e1165244cb5'
    }
    
    it('should return a user id when save to db is successful',  function(done) {
     
      AuthService.signup(data).then(result => {
        expect(result).to.be.a('object').have.property('_id');
        done();
      });

    });

  });

  describe('Login', function() {

    it('should throw an error if user is not found', function(done) {
      sinon.stub(User, 'findOne');
      User.findOne.returns(undefined);

      const body = {
        email: 'test@test.com',
        password: '123456'
      } 

      AuthService.login(body).catch(error => {
        expect(error).to.be.an('error').that.has.property('message', 'User does not exist.');
        done();
      });

      User.findOne.restore();
    })

    it('should return an object with property token and userId when authentiated', function(done) {

      const body = {
        email: 'test@test.com',
        password: 'testpassword'
      }

      AuthService.login(body).then(result => {
        expect(result).to.be.an('object').and.have.property('token');
        expect(result).to.be.an('object').and.have.property('userId');
        done();
      })

    });


    after((done) => {
      User.deleteMany({})
      .then(() => {
        return db.disconnectTest();
      })
      .then(() => {
        done();
      });
    });
  })
})