const Todo = require('../models/Todo')
const asyncHandler = require('express-async-handler')

/**
 * @desc Get all Todos
 * @route GET /todos
 * @access Private
 * 
 * .lean() to avoid getting the methods like save for the object
 */
const getAllTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find().lean()

    if(!todos){
        return res.status(400).json({ message: 'No todos Found'})
    }
    res.json(todos)
})

/**
 * @desc Create new Todo
 * @route POST /todos
 * @access Private
 */
const createNewTodo = asyncHandler(async (req, res) => {
    const { text } = req.body

    // Confirm data
    if(!text) {
        return res.status(400).json({ message: 'Text content is required' })
    }

    // Check for duplicates
    const duplicate = await Todo.findOne({ text }).lean().exec()

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate Todo'}) // 409 = conflict
    }
    
    // Create the todo object with the client request body
    const todo = new Todo({ 
        text: text 
    })

    // Save the new todo in the db
    todo.save()

    res.json(todo)
})

/**
 * @desc Update a Todo
 * @route PATCH /todos
 * @access Private
 */
const updateTodo = asyncHandler(async (req, res) => {
    // Find the todo to update
    const todo = await Todo.findById(req.params.id)

    // Toggle the complete value
    todo.complete = !todo.complete

    // Save the new todo in the db
    todo.save()

    res.json(todo)
})

/**
 * @desc Delete a Todo
 * @route DELETE /todos
 * @access Private
 */
const deleteTodo = asyncHandler(async (req, res) => {
    // Find and delete the todo to delete
    const todo = await Todo.findByIdAndDelete(req.params.id)

    res.json(todo)
})

module.exports = { 
    getAllTodos, 
    createNewTodo, 
    updateTodo, 
    deleteTodo 
}

