const express = require('express');
const bodyParser = require('body-parser');

const mongoConn = require('./app/database/mongoose');
const questionRoutes = require('./app/routes/questions');
const answerRoutes = require('./app/routes/answers');
const searchRoutes = require('./app/routes/search');
const authRoutes = require('./app/routes/auth');
const config = require('./app/config/config');


const app = express();

const port = config.port || 8080;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-HEaders', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/answers', answerRoutes);
app.use('/search', searchRoutes);
app.use('/', questionRoutes);

app.use((error, req, res, next) => {
  
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({
    message,
    data
  })
})

mongoConn.connection()
.then(result => {
  const server = app.listen(port, () => console.log(`server connected at port: ${port}`));
})
.catch(err => console.log(err));

