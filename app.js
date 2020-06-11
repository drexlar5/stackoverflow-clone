const express = require('express');
const bodyParser = require('body-parser');

const mongoConn = require('./app/database/mongoose');
const socket = require('./socket');
const questionRoutes = require('./app/routes/questions');
const answerRoutes = require('./app/routes/answers');
const searchRoutes = require('./app/routes/search');
const authRoutes = require('./app/routes/auth');
const config = require('./app/config/config');


const app = express();

const port = config.port || 8080;

app.use(bodyParser.json());

// CORS middleware
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

// Global error handler
app.use((error, req, res, next) => {
  
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({
    message,
    data
  })
})

// Mongoose, app and websocket connection
mongoConn.connection()
.then(result => {
  const server = app.listen(port, () => console.log(`server connected at port: ${port}`));
  
  // socket IO connection
  const io = socket.init(server);
  io.on('connection', socket => {
    console.log('Client connected');
  })
})
.catch(err => console.log(err));

