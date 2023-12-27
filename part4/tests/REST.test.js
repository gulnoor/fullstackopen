/* eslint-disable no-console */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);
const { blogs: bloglist } = require('../utils/listhelper');

beforeEach(async () => {
  await Blog.deleteMany({});
  const promiseArray = bloglist.map((blog) => new Blog(blog).save());
  await Promise.all(promiseArray);
});
describe('REST Api tests', () => {
  test('should return all blogs in db', async () => {
    await api.get('/api/blogs').expect(200);
  }, 30000);
  test('id is defined as "id", not "_id" ', async () => {
    const res = await api.get('/api/blogs');
    res.body.forEach((b) => {
      expect(b.id).toBeDefined();
    });
  }, 30000);
  test('should create new blog', async () => {
    const note = { title: 'jest test', author: 'goolnur', url: 'etc' };
    // length increased
    const before = await api.get('/api/blogs');
    const createdNote = await api.post('/api/blogs').send(note).expect(201);
    expect(createdNote.body).toMatchObject(note);
    const after = await api.get('/api/blogs');
    expect(after.body).toHaveLength(before.body.length + 1);
    // content correct
  }, 30000);

  test('should set like property to zero if not provided', async () => {
    const note = { title: 'jest test', author: 'goolnur', url: 'etc' };
    const createdNote = await api.post('/api/blogs').send(note).expect(201);
    expect(createdNote.body.likes).toBe(0);
  });
  test('should RETURN 400 bad request if title or url property is missing', async () => {
    const noTitleOrUrl = [{ url: 'example.com' }, { title: 'nice' }];
    const promises = noTitleOrUrl.map((note) => api.post('/api/blogs').expect(400).send(note));
    console.log('before');
    await Promise.all(promises);
    console.log('after');
  }, 30000);
});

afterAll(async () => {
  console.log('closing mongo connection');
  await mongoose.connection.close();
});
