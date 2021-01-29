const { StatusCodes } = require("http-status-codes");
const projects = require("../../database");

const checkProjectIdExists = (req, res, next) => {

  const { id }  = req.params;
  const project = projects.find(p => p.id == id)

  if (!project) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: `The project ${id} is not found`});
  }

  return next();
};

module.exports = checkProjectIdExists;