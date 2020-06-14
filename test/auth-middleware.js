const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const authMiddleware = require('../app/middleware/is-auth');

describe('Auth middleware', function() {
  it('should throw an error if no authorization header is present', function(){
    const req = {
      get: function() {
        return null;
      }
    }
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated')
  });
  
  it('should throw an error when the authorization header is only one string', function(){
    const req = {
      get: function() {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwidXNlcklkIjoiNWVlMGNlYmU5MjI4ZDEwYTU1NDc4MGYzIiwiaWF0IjoxNTkxODQ1MDM0LCJleHAiOjE1OTE4NDg2MzR9.QTYrXsLnJeqI_vyRlswutk-Tf3IZ4Sr0zHH1vnHUvGQ';
      }
    }
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it('should throw an error if the token cannot be verified', function(){
    const req = {
      get: function() {
        return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwidXNlcklkIjoiNWVlMGNlYmU5MjI4ZDEwYTU1NDc4MGYzIiwiaWF0IjoxNTkxODQ1MDM0LCJleHAiOjE1OTE4NDg2MzR9.QTYrXsLnJeqI_vyRlswutk-Tf3IZ4Sr0zHH1vnHUvGQ';
      }
    }
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it('should yield a userId after decoding the token', function(){
    const req = {
      get: function() {
        return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwidXNlcklkIjoiNWVlMGNlYmU5MjI4ZDEwYTU1NDc4MGYzIiwiaWF0IjoxNTkxODQ1MDM0LCJleHAiOjE1OTE4NDg2MzR9.QTYrXsLnJeqI_vyRlswutk-Tf3IZ4Sr0zHH1vnHUvGQ';
      }
    }

    sinon.stub(jwt, 'verify');
    jwt.verify.returns({userId: 'abc123'});

    authMiddleware(req, {}, () => {})
    expect(req).to.have.property('userId');
    
    jwt.verify.restore();
  });
});