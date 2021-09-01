const todoModel = require('../models/todo.model');

exports.createTodo = async (req, res, next) => {
  const createdModel = await todoModel.create(req.body);
  res.status(201).json(createdModel);
};
