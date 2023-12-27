/* eslint-disable no-console */
const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  return next(error);
};
const requestLogger = (request, _, next) => {
  console.log(
    `-------------------------
  Method: ${request.method}
  Path: ${request.path}
  Body: ${JSON.stringify(request.body)})}
  ----------------------`,
  );
  next();
};
const unknownPathHandler = (req, res, next) => {
  res.status(404).send('not found');
  next();
};
module.exports = { errorHandler, requestLogger, unknownPathHandler };
