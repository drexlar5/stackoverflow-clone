const express = require('express');

const answerController = require('../controllers/answers');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/answer', isAuth,  answerController.postAnswer);

module.exports = router;