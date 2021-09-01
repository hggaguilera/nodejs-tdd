const todoController = require('../../controllers/todo.controller');
const todoModel = require('../../models/todo.model');
const newTodo = require('../mock/data.json');
const httpMocks = require('node-mocks-http');

todoModel.create = jest.fn();
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('TodoController.createTodo', () => {
  it('should have a createTodo function', () => {
    expect(typeof todoController.createTodo).toBe('function');
  });
  it('should call todoModel.create', () => {
    req.body = newTodo;

    todoController.createTodo(req, res, next);
    expect(todoModel.create).toBeCalledWith(newTodo);
  });
  it('should return 201 response code', () => {
    req.body = newTodo;

    todoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
