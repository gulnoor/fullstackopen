/* eslint-disable no-console */
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
} = require('./utils/middleware');

const app = express();
const dbURI = process.env.NODE_ENV === 'test' ? MONGODB_URL_TEST : MONGODB_URL_PRODUCTION;
console.log(dbURI);
mongoose.set('strictQuery', false);
mongoose
  .connect(dbURI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/blogs', blogRouter);
app.use(unknownPathHandler);
app.use(errorHandler);

module.exports = app;
