const expect = require('chai').expect;
const sinon = require('sinon');

const db = require('../app/database/mongoose');
const Question = require('../app/models/question');
const User = require('../app/models/user');
const QuestionService = require('../app/services/questions');

describe('Question Service', function() {
  const page = 1;
  const perPage = 2;

  before((done) => {
    db.testConnection()
    .then(result => {
      const user = new User({
        email: 'test@test.com',
        firstname: 'Michael',
        lastname: 'Agboola',
        username: 'devguy',
        password: 'testpassword',
        _id: '5ee414b6f74b2e1165244cb5'
      });
      return user.save();
    })
    .then(() => {
      done();
    });
  });

  describe('Get questions', function() {
    it('should return an empty questions array and a question count of 0 when no doument is found', function(done) {
        QuestionService.getQuestions({page, perPage}).then(result => {
          expect(result.questions).to.be.an('array').that.is.empty;
          expect(result.totalItems).to.equal(0);
          done();
        });
        
    });

    it('should return an object with property (questions, totalItems) when there is document in the db', function(done) {
      const question = new Question({
        title: 'test title',
        content: 'test question content',
        creator: "5ee414b6f74b2e1165244cb5",
      });

      question.save();

      QuestionService.getQuestions({page, perPage}).then(result => {
        expect(result).to.be.an('object');
        expect(result.questions).to.not.be.empty;
        expect(result.totalItems).to.be.greaterThan(0);
        done();
      });
    });

  });

  describe('Create question', function() {
    it('should throw an error if user is not found', function(done) {
      sinon.stub(User, 'findById');
      User.findById.returns(undefined);

      const data = {
        title: 'test title',
        content: 'test question content',
        userId: "2ee414b6f74b2e1165244cbb",
      }

      QuestionService.createQuestion(data).catch(error => {
        expect(error).to.be.an('error').that.has.property('statusCode', 401);
        done();
      });
      User.findById.restore();
    });

    it('should return an object with property (question, creator)  when there is document in the db', function(done) {
      const data = {
        title: 'test title',
        content: 'test question content',
        userId: "5ee414b6f74b2e1165244cb5",
      }

      QuestionService.createQuestion(data).then(result => {
        expect(result).to.be.an('object');
        expect(result.question).to.not.be.empty;
        expect(result.creator).to.not.be.empty;
        done();
      });
    });
  });

  describe('Vote question', function() {
    it('should throw an error if question is not found', function(done) {
      sinon.stub(Question, 'findById');
      Question.findById.returns(undefined);

      const data = {
        questionId: '5ee1366819866227a38faebc',
        vote: 'up',
      }

      QuestionService.voteQuestion(data).catch(error => {
        expect(error).to.be.an('error').that.has.property('message', 'Error occured, could not update vote.');
        done();
      });

      Question.findById.restore();
    });

    it('should return a number',  function(done) {
      
      const question = new Question({
        title: 'test title',
        content: 'test question content',
        _id: '5ee1366819866227a38faebc',
        creator: "5ee414b6f74b2e1165244cb5",
      });

      question.save()
      .then(() => {
        const data = {
          questionId: '5ee1366819866227a38faebc',
          vote: 'up',
        }

        QuestionService.voteQuestion(data).then(result => {
          expect(result).to.be.a('number');
          done();
        });
      });
    });
  });

  describe('Subscribe to question', function() {
    it('should throw an error if creatorId is different from userId', function(done) {
      const data = {
        isSubscribed: true,
        questionId: '5ee1366819866227a38faebc',
        userId: '5ee414b6f74b2e1165244cb4',
      };

      QuestionService.subscribeToQuestion(data).catch(error => {
        expect(error).to.be.an('error').that.has.property('statusCode', 401);
        done();
      });

    });

    it('should return an object',  function(done) {
      
      const data = {
        isSubscribed: true,
        questionId: '5ee1366819866227a38faebc',
        userId: '5ee414b6f74b2e1165244cb5',
      };
        
      QuestionService.subscribeToQuestion(data).then(result => {
        expect(result).to.be.an('object');
        expect(result.isSubscribed).to.be.a('boolean');
        done();
      });
    });
  });

  after((done) => {
    Question.deleteMany({})
    .then(() => {
      return User.deleteMany({});
    })
    .then(() => {
      return db.disconnectTest();
    })
    .then(() => {
      done();
    });
  });
});