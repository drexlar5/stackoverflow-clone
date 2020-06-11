const mongoose = require('mongoose');
const config = require('../config/config');

exports.connection = () => {
  return mongoose.connect(config.mongoConnection, 
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
}