/**
 * @fileoverview This file contains tests for the users API endpoints.
 * @module users.test.js
 */

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const { consoleLog } = require('../utils/logger');

const api = supertest(app);

// Array of user objects used for testing.
const users = [
  {
    id: '59b99db5cfa9a34dcd7885b7',
    username: 'kingRB7',
    name: 'Robert Baratheon',
    email: 'mark_addy@gameofthron.es',
    password: '$2b$12$yGqxLG9LZpXA2xVDhuPnSOZd.VURVkz7wgOLY3pnO0s7u2S1ZO32y',
  },
  {
    id: '59b99db5cfa9a34dcd7885b8',
    username: 'cersie<3',
    name: 'Jaime Lannister',
    email: 'nikolaj_coster-waldau@gameofthron.es',
    password: '$2b$12$6vz7wiwO.EI5Rilvq1zUc./9480gb1uPtXcahDxIadgyC3PS8XCUK',
  },
];

/**
 * Retrieves the current state of the database.
 * @async
 * @function getDatabaseState
 * @returns {Array<Object>} The current state of the database as an array of objects.
 */
async function getDatabaseState() {
  const db = await User.find({});
  return db.map((item) => item.toJSON());
}

/**
 * Clears the database and inserts test users before each test.
 */
beforeEach(async () => {
  await User.deleteMany({});
  const promises = users.map((user) => new User(user).save());
  await Promise.all(promises);
});

describe('users api', () => {
  test('should return all users', async () => {
    const response = await api.get('/api/users').expect(200);
    expect(response.body).toHaveLength(2);
  }, 50000);

  test('should create new user', async () => {
    const before = await User.find({});
    const user = { name: 'gul', username: 'goolnur' };
    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const after = await User.find({});
    expect(before.length).toBe(after.length - 1);
    const userlist = after.map((u) => u.toJSON().username);
    expect(userlist).toContain('goolnur');
  }, 50000);
});

test('should fail if username already taken', async () => {
  const before = await getDatabaseState();
  const user = { username: 'kingRB7', name: 'robert' };
  const response = await api.post('/api/users').send(user).expect(400);
  expect(response.body.error).toContain('expected `username` to be unique');
  const after = await getDatabaseState();
  expect(after).toEqual(before);
});

/**
 * Closes the MongoDB connection after all tests have finished.
 */
afterAll(async () => {
  consoleLog('closing mongo connection');
  await mongoose.connection.close();
});
