const AnswerService = require('../services/answers');

exports.postAnswer = async (req, res, next) => {
  const { questionId, comment } = req.body;
  const userId = req.userId;

  try {
    const result = await AnswerService.postAnswer({ questionId, userId, comment })

    res.status(201)
    .json({
      message: 'Answer successfully created.',
      data: result
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}