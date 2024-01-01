const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

// get all
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// get by id
blogRouter.get('/:id', async (req, res) => {
  const foundBlog = await Blog.findById(req.params.id);
  return foundBlog ? res.status(200).json(foundBlog) : res.status(404).send();
});
// create new
blogRouter.post('/', async (request, response) => {
  // check token
  if (!request.token) {
    return response.status(401).send('token invalid');
  }
  // decode token
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  // get user from db
  const user = await User.findById(decodedToken.id);
  if (user) {
    // save blog
    const blogContent = { ...request.body };
    blogContent.user = user.id;
    blogContent.author = user.name;
    const blog = new Blog(blogContent);
    const savedBlog = await blog.save();
    // add blog reference to it's user
    // eslint-disable-next-line no-underscore-dangle
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    await savedBlog.populate('user', { username: 1, name: 1 });
    return response.status(201).json(savedBlog);
  }
  return response.status(404).send('user not found in database');
});
module.exports = blogRouter;
