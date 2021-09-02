const todoModel = require('../models/todo.model');

exports.createTodo = async (req, res, next) => {
  try {
    const createdModel = await todoModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};
