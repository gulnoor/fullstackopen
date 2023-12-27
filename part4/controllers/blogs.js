const blogRouter = require('express').Router();
const Blog = require('../models/blog');

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
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});
module.exports = blogRouter;
