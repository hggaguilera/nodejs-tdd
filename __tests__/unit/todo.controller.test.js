const httpMocks = require('node-mocks-http');
const todoController = require('../../controllers/todo.controller');
const todoModel = require('../../models/todo.model');
const newTodo = require('../mock/data.json');
const allTodos = require('../mock/todos.json');

todoModel.create = jest.fn();
todoModel.find = jest.fn();
todoModel.findById = jest.fn();
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('TodoController.getTodoById', () => {
  it('should have a getById function', () => {
    expect(typeof todoController.getTodoById).toBe('function');
  });
  it('should call todoModel.findById()', async () => {
    req.params.id = '61312cf0f456031ad7a8c2fa';
    await todoController.getTodoById(req, res, next);
    expect(todoModel.findById).toHaveBeenCalledWith('61312cf0f456031ad7a8c2fa');
  });
  it('should return 200 response code', async () => {
    todoModel.findById.mockReturnValue(newTodo);
    await todoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it('should handle errors when connecting the DB', async () => {
    const errorMessage = { message: 'done property missing' };
    const rejectedPromise = Promise.reject(errorMessage);
    todoModel.findById.mockReturnValue(rejectedPromise);
    await todoController.getTodoById(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
  it('should return 404 when item not found', async () => {
    todoModel.findById.mockReturnValue(null);
    await todoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
describe('TodoController.getTodos', () => {
  it('should have a getTodos method', () => {
    expect(typeof todoController.getTodos).toBe('function');
  });
  it('should call todoModel.find()', async () => {
    await todoController.getTodos(req, res, next);
    expect(todoModel.find).toHaveBeenCalledWith({});
  });
  it('should return 200 response code', async () => {
    todoModel.find.mockReturnValue(allTodos);
    await todoController.getTodos(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTodos);
  });
  it('should handle all errors', async () => {
    const errorMessage = { message: 'collection does not exist' };
    const rejectedPromise = Promise.reject(errorMessage);
    todoModel.find.mockReturnValue(rejectedPromise);
    await todoController.getTodos(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
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
