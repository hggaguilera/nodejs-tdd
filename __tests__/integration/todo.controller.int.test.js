const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock/data.json');

const endpointUrl = '/todos/';
let item;
let newlyCreatedId;

describe('/todos/ endpoint', () => {
  it('should POST /todos/', async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
    newlyCreatedId = response.body._id;
  });
  it('should return error 500 on malformed data with POST /todos/', async () => {
    const response = await request(app).post(endpointUrl).send({ title: 'missing done property' });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message: 'Todo validation failed: done: Path `done` is required.',
    });
  });
  it('should GET all /todos/', async () => {
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    item = response.body[0];
  });
  it('should GET an item from /todos/:id', async () => {
    const response = await request(app).get(`${endpointUrl}${item._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(item.title);
    expect(response.body.done).toBe(item.done);
  });
  it('should return not found', async () => {
    const response = await request(app).get(endpointUrl + '61312d4607acac1b7308977a');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('item not found');
  });
  it('should PUT an item from /todos/:id', async () => {
    const response = await request(app)
      .put(`${endpointUrl}${newlyCreatedId}`)
      .send({ ...newTodo, done: false });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(item.title);
    expect(response.body.done).toBe(false);
  });
  it('should return not found when updating', async () => {
    const response = await request(app)
      .put(endpointUrl + '61312d4607acac1b7308977a')
      .send({ ...newTodo, done: false });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('item not found');
  });
});
