const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

// Already at /todo here
router.route('/')
    .get(todoController.getAllTodos)
    .post(todoController.createNewTodo)
    
router.route('/:id')
    .patch(todoController.updateTodo)
    .delete(todoController.deleteTodo)

module.exports = router