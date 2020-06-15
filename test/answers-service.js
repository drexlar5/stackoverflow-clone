const expect = require('chai').expect;

const db = require('../app/database/mongoose');
const Answer = require('../app/models/answer');
const Question = require('../app/models/question');
const AnswerService = require('../app/services/answers');

describe('Answer Service', function() {

  before((done) => {
    db.testConnection()
    .then(result => {
     const question = new Question({
        title: 'test title',
        content: 'test question content',
        _id: '5ee1366819866227a38faebc',
        creator: "5ee414b6f74b2e1165244cb5",
      });
  
      return question.save();
    })
    .then(() => {
      done();
    });
  });

  describe('Post answer', function() {

    it('should return an object with properties {question, user, comment} if answer is saved successfully', function(done) {
      const data = {
        questionId: '5ee1366819866227a38faebc',
        userId: '5ee414b6f74b2e1165244cb5',
        comment: 'this is a test comment'
      }
  
      AnswerService.postAnswer(data).then(result => {
        expect(result).to.be.an('object').and.have.property('question');
        expect(result).to.be.an('object').and.have.property('user');
        expect(result).to.be.an('object').and.have.property('comment');
        done();
      })
  
    });
  
    it('should throw an error when answer is not created', function(done) {
      const data = {
        questionId: '5ee414b6f74b2e1165244cb5',
        userId: '5ee414b6f74b2e1165244cb5',
        comment: 'this is a test comment'
      }
  
      AnswerService.postAnswer(data).catch(error => {
        expect(error).to.be.an('error');
        done();
      });
  
    });
  });

  after((done) => {
    Question.deleteMany({})
    .then(() => {
      return Answer.deleteMany({});
    })
    .then(() => {
      return db.disconnectTest()
    })
    .then(() => {
      done();
    });
  })
})