const todoController = require('../../controllers/todo.controller');
const todoModel = require('../../models/todo.model');
const newTodo = require('../mock/data.json');
const httpMocks = require('node-mocks-http');

todoModel.create = jest.fn();
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('TodoController.createTodo', () => {
  beforeEach(() => {
    req.body = newTodo;
  });
  it('should have a createTodo function', () => {
    expect(typeof todoController.createTodo).toBe('function');
  });
  it('should call todoModel.create', () => {
    todoController.createTodo(req, res, next);
    expect(todoModel.create).toBeCalledWith(newTodo);
  });
  it('should return 201 response code', async () => {
    await todoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body response', async () => {
    todoModel.create.mockReturnValue(newTodo);
    await todoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it('should handle errors', async () => {
    const errorMessage = { message: 'done property missing' };
    const rejectedPromise = Promise.reject(errorMessage);
    todoModel.create.mockReturnValue(rejectedPromise);
    await todoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
