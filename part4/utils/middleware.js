const { consoleLog } = require('./logger');

const errorHandler = (error, req, res, next) => {
  consoleLog(error.message);
  switch (error.name) {
    case 'JsonWebTokenError':
      return res.status(401).send({ error: 'Invalid Token' });
    case 'CastError':
      return res.status(400).send({ error: 'malformatted id' });
    case 'ValidationError':
      return res.status(400).json({ error: error.message });
    default:
      return next(error);
  }
};
const getToken = (request, response, next) => {
  const header = request.header('Authorization');
  request.token = header ? header.replace('Bearer ', '') : null;
  next();
};
const requestLogger = (request, response, next) => {
  consoleLog(
    `-------------------------
  Method: ${request.method}
  Path: ${request.path}
  Body: ${JSON.stringify(request.body)}
  -----------------------`,
  );
  next();
};
const unknownPathHandler = (req, res, next) => {
  res.status(404).send('unknown endpoint');
  next();
};
module.exports = {
  errorHandler,
  requestLogger,
  unknownPathHandler,
  getToken,
};
