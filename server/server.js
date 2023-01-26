const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Model import
const Todo = require('./models/Todo')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Get all todos
app.get('/todos', async (req, res) => {
    const todos = await Todo.find()

    res.json(todos)
})

//Create a todo
app.post('/todo/new', async (req, res) => {
    // Create the todo object with the client request body
    const todo = new Todo({ 
        text: req.body.text 
    })

    // Save the new todo in the db
    todo.save()

    res.json(todo)
})

// Update a todo 
app.patch('/todo/complete/:id', async (req, res) => {
    // Find the todo to update
    const todo = await Todo.findById(req.params.id)

    // Toggle the complete value
    todo.complete = !todo.complete

    // Save the new todo in the db
    todo.save()

    res.json(todo)
})

// Delete a todo
app.delete('/todo/delete/:id', async (req, res) => {
    // Find and delete the todo to delete
    const todo = await Todo.findByIdAndDelete(req.params.id)

    res.json(todo)
})

/**
 * Mongoose Setup
 */
const PORT = process.env.port || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
.catch((error) => console.log(`${error} did not connect`))