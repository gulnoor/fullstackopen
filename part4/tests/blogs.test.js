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
describe('blogs REST Api', () => {
  test('GET: should return all blogs in db', async () => {
    await api.get('/api/blogs').expect(200);
  }, 30000);
  test('id is defined as "id", not "_id" ', async () => {
    const res = await api.get('/api/blogs');
    res.body.forEach((b) => {
      expect(b.id).toBeDefined();
    });
  }, 30000);
  test('PUT: should update the blog', async () => {
    const updatedBlog = await api
      .put(`/api/blogs/${bloglist[0].id}`)
      .send({ ...bloglist[0], title: 'this is updated title' })
      .expect(202);
    expect(updatedBlog.body.title).toBe('this is updated title');
  });
  test('DELETE: should delete the blog', async () => {
    // TODO:
    const id = '';
    await api.delete(`/api/blogs/${id}`);
    const afterDelete = await api.get('/api/blogs');
    const ids = afterDelete.body.map((blog) => blog.id);
    expect(ids).not().toContain('');
  });
  test('POST: should create new blog', async () => {
    const note = {
      title: 'jest test',
      author: 'goolnur',
      url: 'etc',
      userId: '59b99db5cfa9a34dcd7885b7',
    };
    const before = await api.get('/api/blogs');

    const after = await api.get('/api/blogs');
    // content correct
    expect(after.body.some((b) => b.author === note.author && b.user === note.userId)).toBe(true);
    // length increased
    expect(after.body).toHaveLength(before.body.length + 1);
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
