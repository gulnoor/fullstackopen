const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const { MONGODB_URL } = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const { errorHandler, requestLogger, unknownPathHandler } = require('./utils/middleware');

const app = express();
mongoose.set('strictQuery', false);
mongoose
  .connect(MONGODB_URL)
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
