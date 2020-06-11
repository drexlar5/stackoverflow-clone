const Search = require('../services/search');

exports.searchQuestion = async (req, res, next) => {
  const { queryString } = req.params;
  const { page, perPage } = req.query;

  try {
    const searchResult = await Search.searchQuestion({ queryString, page, perPage })

    if (searchResult.length === 0){
      res.status(204).json({
        message: `Search for ${queryString} not found`,
        data: searchResult
      })
    } else {
      res.status(200).json({
        message: 'Question search successful',
        data: searchResult
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.searchAnswer = async (req, res, next) => {
  const { queryString } = req.params;
  const { page, perPage } = req.query;

  try {
    const searchResult = await Search.searchAnswer({ queryString, page, perPage });

    if (searchResult.length === 0){
      res.status(204).json({
        message: `Search for ${queryString} not found`,
        data: searchResult
      })
    } else {
      res.status(200).json({
        message: 'Answer search successful',
        data: searchResult
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.searchUser = async (req, res, next) => {
  const { queryString } = req.params;
  const { page, perPage } = req.query;

  try {
    const searchResult = await Search.searchUser({ queryString, page, perPage });


    if (searchResult.length === 0){
      res.status(204).json({
        message: `Search for ${queryString} not found`,
        data: searchResult
      })
    } else {
      res.status(200).json({
        message: 'User search successful',
        data: searchResult
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}