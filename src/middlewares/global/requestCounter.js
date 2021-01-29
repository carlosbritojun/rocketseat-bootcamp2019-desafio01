const requestCounter = (req, res, next) => {
  console.count("NumberOfRequests");
  return next();
};

module.exports = requestCounter;