const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs');
  res.status(200).json(users);
});

userRouter.post('/', async (req, res) => {
  const user = req.body;
  if (user.password.length < 3) {
    const e = new Error('pasword must be greater than 3 characters');
    e.name = 'ValidationError';
    throw e;
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(user.password, saltRounds);
  const newUser = new User({ ...user, password: passwordHash });
  const savedUser = await newUser.save();
  res.status(200).json(savedUser);
});

module.exports = userRouter;
