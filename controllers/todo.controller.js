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

const getTodoById = async (req, res, next) => {
  try {
    const docId = await todoModel.findById(req.params.id);
    if (!docId) {
      return res.status(404).json({ message: 'item not found' });
    }
    return res.status(200).json(docId);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!updatedTodo) {
      return res.status(404).json({ message: 'item not found' });
    }
    return res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTodo, getTodos, getTodoById, updateTodo };
