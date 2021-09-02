const todoModel = require('../models/todo.model');

const createTodo = async (req, res, next) => {
  try {
    const createdModel = await todoModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};

const getTodos = async (req, res, next) => {
  try {
    const allDocs = await todoModel.find({});
    res.status(200).json(allDocs);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTodo, getTodos };
