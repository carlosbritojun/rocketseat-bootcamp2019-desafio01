const { StatusCodes } = require('http-status-codes');
const projects = require('../../database');

const checkTaskExists = (req, res, next) => {
  
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  
  if (project.tasks.find(t => t == title)) {
     return res.status(StatusCodes.BAD_REQUEST).json({message: 'The tasks already exists'});
  }

  return next();
};

module.exports = checkTaskExists;

