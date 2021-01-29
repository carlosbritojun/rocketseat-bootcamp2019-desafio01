const { StatusCodes } = require('http-status-codes');

const checkTitleNotNull = (req, res, next) => {
  
  const { title } = req.body;

  if (!title) {
    return res.status(StatusCodes.BAD_REQUEST).json({message: 'Title is required'});
  }

  return next();
};

module.exports = checkTitleNotNull;

