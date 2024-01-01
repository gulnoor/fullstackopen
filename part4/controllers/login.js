const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  // check if username exists
  const user = await User.findOne({ username });

  // check if password is correct
  const passwordCorrect = user !== null ? await bcrypt.compare(password, user.password) : false;
  if (!user || !passwordCorrect) {
    return res.status(400).json('username or password is invalid');
  }

  // create token
  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  return res
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
