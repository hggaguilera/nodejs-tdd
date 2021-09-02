const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock/data.json');

const endpointUrl = '/todos/';

describe('/todos/ endpoint', () => {
  it('should POST /todos/', async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
  it('should return error 500 on malformed data with POST /todos/', async () => {
    const response = await request(app).post(endpointUrl).send({ title: 'missing done property' });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message: 'Todo validation failed: done: Path `done` is required.',
    });
  });
});
