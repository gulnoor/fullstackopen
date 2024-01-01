const { default: mongoose } = require('mongoose');
const cors = require('cors');
const express = require('express');
require('express-async-errors');
const { MONGODB_URL_PRODUCTION, MONGODB_URL_TEST } = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const {
  errorHandler,
  requestLogger,
  unknownPathHandler,
  getToken,
} = require('./utils/middleware');
const userRouter = require('./controllers/users');
const { consoleLog } = require('./utils/logger');
const loginRouter = require('./controllers/login');

const app = express();
const dbURI = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development' ? MONGODB_URL_TEST : MONGODB_URL_PRODUCTION;
mongoose.set('strictQuery', false);
mongoose
  .connect(dbURI)
  .then(() => {
    ('connected to MongoDB');
  })
  .catch((error) => {
    consoleLog('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(getToken);
app.use(requestLogger);
app.use('/login', loginRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use(unknownPathHandler);
app.use(errorHandler);

module.exports = app;
